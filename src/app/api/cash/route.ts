import { NextResponse } from 'next/server';
import { getCashTransactions, createManualTransaction } from '@/services/cash.service';
import { insertActivityLog } from '@/app/lib/logger';
import { getAdminNameFromRequest } from '@/app/lib/auth';

// ============================================================================
// METHOD GET: Ambil Data Kas
// ============================================================================
export async function GET() {
  try {
    const data = await getCashTransactions();
    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

// ============================================================================
// METHOD POST: Tambah Transaksi Kas Manual
// ============================================================================
export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validasi input
    if (!body.tanggal || !body.tipe || !body.kategori || !body.nominal) {
      return NextResponse.json(
        { success: false, message: "Semua field wajib diisi!" }, 
        { status: 400 }
      );
    }

    if (body.nominal <= 0) {
      return NextResponse.json(
        { success: false, message: "Nominal harus lebih dari 0" }, 
        { status: 400 }
      );
    }

    if (!['pemasukan', 'pengeluaran'].includes(body.tipe)) {
      return NextResponse.json(
        { success: false, message: "Tipe transaksi tidak valid" }, 
        { status: 400 }
      );
    }

    const data = await createManualTransaction(body);
    const adminName = await getAdminNameFromRequest(request);
    const formatRupiah = new Intl.NumberFormat('id-ID', { 
        style: 'currency', 
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(body.nominal);

    await insertActivityLog(
        adminName, 
        'TAMBAH', 
        'KAS', 
        `Menambahkan ${body.tipe} manual sebesar ${formatRupiah} (Kategori: ${body.kategori})`
    );

    return NextResponse.json({ success: true, data }, { status: 201 });

  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}