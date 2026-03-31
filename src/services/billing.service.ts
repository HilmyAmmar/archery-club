import { supabase } from "@/app/lib/supabase";

// --- TIPE DATA ---
export interface PaymentRecord {
    id: string;
    member_id: string;
    month: number;
    year: number;
    nominal_tagihan: number;
    nominal_bayar: number;
    tanggal_bayar: string | null;
    bukti_transaksi: string | null;
    keterangan: string | null;
    status: 'lunas' | 'belum' | 'cicil';
    members?: {
        nama_lengkap: string;
        tipe_membership: string;
    };
}

// --- HARGA PAKET ---
const HARGA_PAKET: Record<string, number> = {
  'Weekend': 600000,
  'Reguler': 700000,
  'Prestasi': 800000,
};

/**
 * 1. Ambil Semua Data Iuran (Filter per Bulan & Tahun)
 */
export async function getBillingsService(month: number, year: number) {
    const { data, error } = await supabase
        .from('payments')
        .select(`
            *, 
            members (
                nama_lengkap, 
                tipe_membership, 
                no_hp_wali,
                nama_wali
            )
        `) 
        .eq('month', month)
        .eq('year', year)
        .order('created_at', { ascending: false });

    if (error) {
        throw new Error(`Gagal mengambil data iuran: ${error.message}`);
    }
    return data as PaymentRecord[];
}

/**
 * 2. Generate Tagihan Massal (Awal Bulan)
 */
export async function generateMassBillingService(month: number, year: number) {
    // 1. Ambil SEMUA member yang berhak ditagih (Aktif & Cuti)
    const { data: members, error: memberError } = await supabase
        .from('members')
        .select('id, tipe_membership, status_member, biaya_custom')
        .in('status_member', ['aktif', 'cuti']);

    if (memberError) throw new Error(`Gagal ambil data member: ${memberError.message}`);

    // 2. Ambil tagihan yang SUDAH ADA di bulan/tahun ini
    const { data: existingPayments } = await supabase
        .from('payments')
        .select('member_id, status')
        .eq('month', month)
        .eq('year', year);

    // Kita buat Set untuk ID member yang sudah LUNAS atau CICIL (Jangan diganggu!)
    const protectedMemberIds = new Set(
        existingPayments
            ?.filter(p => p.status === 'lunas' || p.status === 'cicil')
            .map(p => p.member_id)
    );

    // 3. Mapping Payload (The Interceptor Logic)
    const payloadToInsert = members
        .filter(m => !protectedMemberIds.has(m.id)) // Filter: Hanya proses yang BELUM bayar
        .map((m) => {
            let nominalFinal = 0;

            // Hitung harga berdasarkan kondisi TERBARU di tabel members
            if (m.status_member === 'cuti') {
                nominalFinal = 50000;
            } else {
                nominalFinal = m.biaya_custom ?? (HARGA_PAKET[m.tipe_membership] || 0);
            }

            return {
                member_id: m.id,
                month: month,
                year: year,
                nominal_tagihan: nominalFinal,
                nominal_bayar: 0,
                status: 'belum' as const,
            };
        });

    if (payloadToInsert.length === 0) return { success: true, count: 0 };

    // 4. UPSERT (Update on Conflict)
    // Karena kita pakai 'upsert' dan tidak pakai 'ignoreDuplicates', 
    // nominal_tagihan yang lama akan DITIMPA dengan nominal_tagihan yang baru.
    const { error: insertError } = await supabase
        .from('payments')
        .upsert(payloadToInsert, { 
            onConflict: 'member_id,month,year' 
        });

    // ==========================================================
    // LOGIC DELETE (CLEANUP) - KHUSUS MEMBER NON-AKTIF
    // ==========================================================
    
    // Ambil semua ID member yang barusan kita proses (Aktif & Cuti)
    const activeAndCutiIds = members.map(m => m.id);

    if (activeAndCutiIds.length > 0) {
        const { error: deleteError } = await supabase
        .from('payments')
        .delete()
        .eq('month', month)
        .eq('year', year)
        .eq('status', 'belum') // AMAN: Hanya hapus yang belum bayar
        .not('member_id', 'in', `(${activeAndCutiIds.join(',')})`); 
        // ^ Artiannya: Hapus yang ID-nya GAK ADA di daftar Aktif/Cuti

        if (deleteError) {
        console.error("Gagal cleanup member non-aktif:", deleteError);
        }
    }

    if (insertError) throw new Error(`Gagal sinkronisasi tagihan: ${insertError.message}`);
    
    return { success: true, count: payloadToInsert.length };
}

/**
 * 3. Update Pembayaran Member & Sinkronisasi Kas Otomatis (RPC)
 */
export async function updatePaymentService(paymentId: string, payload: Partial<PaymentRecord>) {
    // 1. Kita butuh nominal_tagihan untuk menentukan status lunas/cicil
    let tagihan: number = payload.nominal_tagihan ?? 0;

    if (!tagihan) {
        const { data: current } = await supabase
            .from('payments')
            .select('nominal_tagihan')
            .eq('id', paymentId)
            .single();
        tagihan = current?.nominal_tagihan ?? 0;
    }

    const bayar = Number(payload.nominal_bayar || 0);
    
    // 2. Tentukan Status (Logic tetap di Server)
    let statusFinal: 'lunas' | 'cicil' | 'belum' = 'belum';
    if (bayar >= tagihan) {
        statusFinal = 'lunas';
    } else if (bayar > 0) {
        statusFinal = 'cicil';
    }

    const cleanDate = payload.tanggal_bayar ? payload.tanggal_bayar.substring(0, 10) : null;

    // 3. PANGGIL RPC (Remote Procedure Call)
    // Ini yang bikin iuran dan kas harian sinkron dalam satu transaksi
    const { data, error } = await supabase.rpc('process_payment_and_ledger', {
        p_payment_id: paymentId,
        p_nominal_bayar: bayar,
        p_status: statusFinal,
        p_keterangan: payload.keterangan || '',
        p_bukti_url: payload.bukti_transaksi || null,
        p_tanggal_bayar: cleanDate
    });

    if (error) {
        console.error("RPC Error:", error);
        throw new Error(`Gagal sinkronisasi pembayaran: ${error.message}`);
    }

    // Return data manual agar UI FE bisa langsung update state tanpa refresh
    return { 
        ...payload, 
        id: paymentId, 
        status: statusFinal, 
        nominal_bayar: bayar ,
        tanggal_bayar: cleanDate
    };
}