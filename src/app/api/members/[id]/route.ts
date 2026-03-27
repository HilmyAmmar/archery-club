import { NextResponse } from 'next/server';
import { updateMemberService, deleteMemberService } from '@/services/member.service';

// ============================================================================
// METHOD PUT: Mengubah data member (EDIT)
// ============================================================================
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> } // 1. params adalah Promise
) {
  try {
    // 2. Await params untuk mendapatkan id
    const { id } = await params;

    if (!id || id === 'undefined') {
        return NextResponse.json({ success: false, message: 'ID Member tidak valid' }, { status: 400 });
    }

    const body = await request.json();
    const updatedMember = await updateMemberService(id, body);

    return NextResponse.json({
      success: true,
      message: 'Data member berhasil diperbarui!',
      data: updatedMember
    }, { status: 200 });

  } catch (error: any) {
    return NextResponse.json({ 
      success: false, 
      message: error.message || 'Internal Server Error' 
    }, { status: 500 });
  }
}

// ============================================================================
// METHOD DELETE: Menghapus data member (DELETE)
// ============================================================================
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> } // 1. params adalah Promise
) {
  try {
    // 2. Await params untuk mendapatkan id
    const { id } = await params;

    if (!id || id === 'undefined') {
        return NextResponse.json({ success: false, message: 'ID Member tidak valid' }, { status: 400 });
    }

    await deleteMemberService(id);

    return NextResponse.json({
      success: true,
      message: 'Member berhasil dihapus!'
    }, { status: 200 });

  } catch (error: any) {
    return NextResponse.json({ 
      success: false, 
      message: error.message || 'Internal Server Error' 
    }, { status: 500 });
  }
}