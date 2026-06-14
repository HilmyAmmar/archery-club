// Buka file: app/lib/auth.ts
import { jwtVerify } from 'jose';
import { supabase } from '@/app/lib/supabase';

if (!process.env.JWT_SECRET) {
    throw new Error('FATAL ERROR: JWT_SECRET is not defined in environment variables');
}

const JWT_SECRET = new TextEncoder().encode(
    process.env.JWT_SECRET
);

export async function getAdminNameFromRequest(request: Request): Promise<string> {
    try {
        const authHeader = request.headers.get('authorization');

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return "Admin Unknown";
        }

        const token = authHeader.split(' ')[1];

        const { payload } = await jwtVerify(token, JWT_SECRET);

        if (payload.name) {
            return payload.name as string;
        }

        if (payload.sub || payload.id) {
            const adminId = payload.sub || payload.id;

            const { data, error } = await supabase
                .from('admins')
                .select('name')
                .eq('id', adminId)
                .single();

            if (!error && data && data.name) {
                return data.name;
            }
        }

        return "Admin Unknown";
    } catch (error) {
        console.error('Gagal bongkar token:', error);
        return "Admin Unknown";
    }
}