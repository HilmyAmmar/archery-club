import { NextResponse } from 'next/server';
import { updateMemberService, deleteMemberService, getMemberByIdService } from '@/services/member.service';
// 1. IMPORT HELPER LOG & AUTH
import { insertActivityLog } from '@/app/lib/logger';
import { getAdminNameFromRequest } from '@/app/lib/auth';

// ============================================================================
// METHOD GET: Ambil Detail 1 Member
// ============================================================================
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id || id === 'undefined') {
        return NextResponse.json({ success: false, message: 'ID Member tidak valid' }, { status: 400 });
    }

    const memberData = await getMemberByIdService(id);

    return NextResponse.json({
      success: true,
      message: 'Detail member berhasil diambil',
      data: memberData
    }, { status: 200 });

  } catch (error: any) {
    return NextResponse.json({ 
      success: false, 
      message: error.message || 'Internal Server Error' 
    }, { status: 500 });
  }
}

// ============================================================================
// METHOD PUT: Mengubah data member (EDIT)
// ============================================================================
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> } 
) {
  try {
    const { id } = await params;

    if (!id || id === 'undefined') {
        return NextResponse.json({ success: false, message: 'ID Member tidak valid' }, { status: 400 });
    }

    const body = await request.json();
    const updatedMember = await updateMemberService(id, body);

    // ==========================================================
    // 2. TEMBAK LOG DI SINI (SETELAH BERHASIL UPDATE)
    // ==========================================================
    const adminName = await getAdminNameFromRequest(request);
    await insertActivityLog(
        adminName, 
        'EDIT', 
        'MEMBER', 
        `Mengubah data member: ${updatedMember.nama_lengkap || id}`
    );

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
  { params }: { params: Promise<{ id: string }> } 
) {
  try {
    const { id } = await params;

    if (!id || id === 'undefined') {
        return NextResponse.json({ success: false, message: 'ID Member tidak valid' }, { status: 400 });
    }

    // 1. AMBIL NAMA SEBELUM DATANYA LENYAP DARI DATABASE
    const memberData = await getMemberByIdService(id);
    const namaMember = memberData ? memberData.nama_lengkap : id; 

    // 2. EKSEKUSI HAPUS
    await deleteMemberService(id);

    // 3. TEMBAK LOG DENGAN NAMA YANG UDAH DIAMBIL
    const adminName = await getAdminNameFromRequest(request);
    await insertActivityLog(
        adminName, 
        'HAPUS', 
        'MEMBER', 
        `Menghapus member: ${namaMember}` // <-- SEKARANG PAKE NAMA!
    );

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