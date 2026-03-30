import { NextResponse } from 'next/server';
import { updateManualTransaction, deleteManualTransaction } from '@/services/cash.service';

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
    
    // Panggil service untuk update
    const updatedData = await updateManualTransaction(id, body);

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

    // Panggil service untuk delete
    await deleteManualTransaction(id);

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