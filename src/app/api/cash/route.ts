import { NextResponse } from 'next/server';
import { getCashTransactions, createManualTransaction } from '@/services/cash.service';

export async function GET() {
  try {
    const data = await getCashTransactions();
    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // --- BE VALIDATION (Keamanan Lapis Dua) ---
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
    // ------------------------------------------

    const data = await createManualTransaction(body);
    
    return NextResponse.json({ success: true, data }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}