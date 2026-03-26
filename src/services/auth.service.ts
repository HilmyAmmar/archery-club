import { supabase } from '../app/lib/supabase'; 
import bcrypt from 'bcryptjs';
import { SignJWT } from 'jose';

const JWT_SECRET = new TextEncoder().encode(
    process.env.JWT_SECRET || 'secret-key-for-jwt'
);

export async function registerAdmin(username: string, password: string) {
    try {
        const saltRounds = 10;

        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const { data, error } = await supabase
            .from('admins')
            .insert(
                [
                    {
                        username: username,
                        password_hash: hashedPassword,
                        role: 'superadmin'
                    }
                ]
            )
            .select()
            .single();

        if (error) {
            console.error('Error registering admin:', error);
            throw new Error('Failed to register admin');
            return null;
        }

        return data;
    } catch (error) {
        console.error('Error hashing password:', error);
        throw new Error('Failed to register admin');
    }
}

export async function loginAdmin(username: string, password: string) {
    try {
        const { data, error } = await supabase
            .from('admins')
            .select('*')
            .eq('username', username)
            .single();

        if (error) {
            console.error('Error logging in admin:', error);
            throw new Error('Failed to login admin');
        }

        const iValidPassword = await bcrypt.compare(password, data.password_hash);

        if (!iValidPassword) {
            throw new Error('Invalid username or password');
        }

        const payload = {
            id: data.id,
            username: data.username,
            role: data.role || 'superadmin'
        }

        const token = await new SignJWT(payload)
            .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
            .setIssuedAt()
            .setExpirationTime('24h')
            .sign(JWT_SECRET);
        return { token, user: payload };    

    } catch (error) {
        console.error('Error logging in admin:', error);
        throw new Error('Failed to login admin');

    }
}