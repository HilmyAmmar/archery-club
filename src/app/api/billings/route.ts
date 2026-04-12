import { NextResponse } from 'next/server';
import { 
  getBillingsService, 
  generateMassBillingService, 
  updatePaymentService 
} from '@/services/billing.service';
// 1. IMPORT HELPER LOG & AUTH
import { insertActivityLog } from '@/app/lib/logger';
import { getAdminNameFromRequest } from '@/app/lib/auth';

// 1. GET: Ambil Semua Data Iuran (Filter per Bulan & Tahun)
export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const month = Number(searchParams.get('month'));
        const year = Number(searchParams.get('year'));

        if (!month || !year) {
            return NextResponse.json({ message: 'Periode (Bulan/Tahun) tidak lengkap'}, { status: 400 });
        }

        const data = await getBillingsService(month, year);
        return NextResponse.json({ success: true, data }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Gagal mengambil data iuran' }, { status: 500 });
    }
}

// 2. POST: Generate Tagihan Massal (Awal Bulan)
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { month, year } = body;

        if (!month || ! year) {
            return NextResponse.json({ message: 'Periode (Bulan/Tahun) tidak lengkap'}, { status: 400 });
        }

        const result = await generateMassBillingService(month, year);

        // ==========================================================
        // LOGGING GENERATE TAGIHAN
        // ==========================================================
        const adminName = await getAdminNameFromRequest(request);
        const namaBulan = new Date(year, month - 1).toLocaleString('id-ID', { month: 'long' });
        
        await insertActivityLog(
            adminName, 
            'TAMBAH', 
            'BILLING', 
            `Melakukan generate tagihan massal untuk periode ${namaBulan} ${year}`
        );

        return NextResponse.json({ success: true, message: result }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Gagal menghasilkan tagihan massal' }, { status: 500 });
    }
}

// 3. PUT: Update Pembayaran Member (Auto-Status Logic)
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, ...payload } = body;

    if (!id) {
      return NextResponse.json({ message: 'ID Transaksi tidak ditemukan' }, { status: 400 });
    }

    // Auto-status logic dijalankan di dalam service ini
    const data = await updatePaymentService(id, payload);

    // ==========================================================
    // LOGGING UPDATE PEMBAYARAN
    // ==========================================================
    const adminName = await getAdminNameFromRequest(request);
    
    const formatRupiah = new Intl.NumberFormat('id-ID', { 
        style: 'currency', 
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(payload.nominal_bayar || 0);

    const namaMember = data?.members?.nama_lengkap || 'Member';

    await insertActivityLog(
        adminName, 
        'EDIT', 
        'BILLING', 
        `Mencatat pembayaran iuran ${namaMember} sebesar ${formatRupiah} (Status: ${data.status.toUpperCase()})`
    );

    return NextResponse.json({ 
      success: true, 
      message: 'Pembayaran berhasil diperbarui', 
      data 
    }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}