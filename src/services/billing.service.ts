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
    const { data: members, error: memberError } = await supabase
        .from('members')
        .select('id, tipe_membership, status_member')
        .in('status_member', ['aktif', 'cuti']);

    if (memberError) {
        throw new Error(`Gagal mengambil data member: ${memberError.message}`);
    }
    
    if (!members || members.length === 0) {
        throw new Error('Tidak ada member aktif atau cuti untuk dibuatkan tagihan.');
    }

    const payloadToInsert = members.map((m) => {
        let nominalTagihan = 0;
        if (m.status_member === 'cuti') {
            nominalTagihan = 50000; 
        } else {
            nominalTagihan = HARGA_PAKET[m.tipe_membership] || 0;
        }

        return {
            member_id: m.id,
            month: month,
            year: year,
            nominal_tagihan: nominalTagihan,
            nominal_bayar: 0,
            status: 'belum' as const,
        };
    });

    const { error: insertError } = await supabase
        .from('payments')
        .upsert(payloadToInsert, { 
            onConflict: 'member_id,month,year', 
            ignoreDuplicates: true 
        });

    if (insertError) throw new Error(`Gagal generate tagihan: ${insertError.message}`);
    
    return { success: true, count: payloadToInsert.length };
}

/**
 * 3. Update Pembayaran Member (Auto-Status Logic)
 */
export async function updatePaymentService(paymentId: string, payload: Partial<PaymentRecord>) {
    // Kita butuh nominal_tagihan untuk menentukan status lunas/cicil
    let tagihan: number = payload.nominal_tagihan ?? 0;

    // Jika tagihan tidak dikirim dari FE, kita ambil dulu dari database
    if (!tagihan) {
        const { data: current } = await supabase
            .from('payments')
            .select('nominal_tagihan')
            .eq('id', paymentId)
            .single();
        tagihan = current?.nominal_tagihan ?? 0;
    }

    const bayar = Number(payload.nominal_bayar || 0);
    
    // --- Server Side Business Rule Enforcement ---
    if (bayar >= tagihan) {
        payload.status = 'lunas';
    } else if (bayar > 0) {
        payload.status = 'cicil';
    } else {
        payload.status = 'belum';
    }

    const { data, error } = await supabase
        .from('payments')
        .update(payload)
        .eq('id', paymentId)
        .select()
        .single();

    if (error) {
        throw new Error(`Gagal update pembayaran: ${error.message}`);
    }
    return data;
}