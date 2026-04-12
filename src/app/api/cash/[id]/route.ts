import { NextResponse } from 'next/server';
import { updateManualTransaction, deleteManualTransaction } from '@/services/cash.service';
import { insertActivityLog } from '@/app/lib/logger';
import { getAdminNameFromRequest } from '@/app/lib/auth';

// ============================================================================
// METHOD PUT: Mengubah data transaksi manual (EDIT)
// ============================================================================
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id || id === 'undefined') {
      return NextResponse.json({ success: false, message: 'ID Transaksi tidak valid' }, { status: 400 });
    }

    const body = await request.json();
    
    const updatedData = await updateManualTransaction(id, body);

    const adminName = await getAdminNameFromRequest(request);
    
    const nominalLog = updatedData?.nominal || body.nominal || 0;
    const kategoriLog = updatedData?.kategori || body.kategori || 'Tidak diketahui';

    const formatRupiah = new Intl.NumberFormat('id-ID', { 
        style: 'currency', 
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(nominalLog);

    await insertActivityLog(
        adminName, 
        'EDIT', 
        'KAS', 
        `Mengubah transaksi kas manual menjadi ${formatRupiah} (Kategori: ${kategoriLog})`
    );

    return NextResponse.json({
      success: true,
      message: 'Transaksi berhasil diperbarui!',
      data: updatedData
    }, { status: 200 });

  } catch (error: any) {
    return NextResponse.json({ 
      success: false, 
      message: error.message || 'Internal Server Error' 
    }, { status: 500 });
  }
}

// ============================================================================
// METHOD DELETE: Menghapus data transaksi manual (DELETE)
// ============================================================================
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id || id === 'undefined') {
      return NextResponse.json({ success: false, message: 'ID Transaksi tidak valid' }, { status: 400 });
    }

    await deleteManualTransaction(id);

    const adminName = await getAdminNameFromRequest(request);
    
    await insertActivityLog(
        adminName, 
        'HAPUS', 
        'KAS', 
        `Menghapus transaksi kas manual dengan ID: ${id}`
    );

    return NextResponse.json({
      success: true,
      message: 'Transaksi berhasil dihapus!'
    }, { status: 200 });

  } catch (error: any) {
    return NextResponse.json({ 
      success: false, 
      message: error.message || 'Internal Server Error' 
    }, { status: 500 });
  }
}