import { NextResponse } from 'next/server';
import { 
  getBillingsService, 
  generateMassBillingService, 
  updatePaymentService 
} from '@/services/billing.service';

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
        const { month, year } = await request.json();

        if (!month || ! year) {
            return NextResponse.json({ message: 'Periode (Bulan/Tahun) tidak lengkap'}, { status: 400 });
        }

        const result = await generateMassBillingService(month, year);
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

    return NextResponse.json({ 
      success: true, 
      message: 'Pembayaran berhasil diperbarui', 
      data 
    }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}