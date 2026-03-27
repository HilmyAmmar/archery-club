import { loginAdmin } from '@/services/auth.service';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const { username, password } = await request.json();

        const result = await loginAdmin(username, password);

        if (!result) {
            return NextResponse.json({ message: 'Username atau password salah' }, { status: 401 });
        }

        const response = NextResponse.json({ message: 'Login Berhasil', ...result });

        response.cookies.set({
            name: 'token',
            value: result.token,
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/',
            maxAge: 60 * 60 * 24 * 7, 
        });

        return response;
        
    } catch (error: any) {
        console.error('Error logging in admin:', error);
        
        return NextResponse.json(
            { message: error.message || 'Username atau password salah.' }, 
            { status: 401 }
        );
    }
}