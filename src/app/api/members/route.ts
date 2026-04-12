import { NextResponse } from 'next/server';
import { getAllMembersService, createMemberService } from '@/services/member.service';
import { insertActivityLog } from '@/app/lib/logger'; 
import { getAdminNameFromRequest } from '@/app/lib/auth';

export async function GET() {
  try {
    const members = await getAllMembersService();

    return NextResponse.json({
      success: true,
      message: 'Data member berhasil diambil',
      data: members
    }, { status: 200 });

  } catch (error: any) {
    return NextResponse.json({ 
      success: false, 
      message: error.message || 'Internal Server Error' 
    }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.nama_lengkap || !body.jenis_kelamin || !body.tipe_membership) {
      return NextResponse.json({ 
        success: false, 
        message: 'Nama lengkap, jenis kelamin, dan tipe membership wajib diisi!' 
      }, { status: 400 });
    }

    const newMember = await createMemberService(body);

    const adminName = await getAdminNameFromRequest(request);
    
    await insertActivityLog(
        adminName, 
        'TAMBAH', 
        'MEMBER', 
        `Menambahkan member baru bernama ${body.nama_lengkap} (Paket: ${body.tipe_membership})`
    );

    return NextResponse.json({
      success: true,
      message: 'Member baru berhasil ditambahkan!',
      data: newMember
    }, { status: 201 });

  } catch (error: any) {
    return NextResponse.json({ 
      success: false, 
      message: error.message || 'Internal Server Error' 
    }, { status: 500 });
  }
}