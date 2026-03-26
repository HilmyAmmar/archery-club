import { NextResponse } from 'next/server';
import { registerAdmin } from '@/services/auth.service';

export async function GET() {
    // Panggil fungsi yang lu buat tadi
    const result = await registerAdmin('syarnasavitri', 'hilmymolly');
    return NextResponse.json({ message: 'Admin Berhasil Dibuat!', data: result });
}