import { supabase } from '../app/lib/supabase';
import bcrypt from 'bcryptjs';
import { SignJWT } from 'jose';
import { getJwtSecret, SESSION_TTL_SECONDS } from '../app/lib/jwt';

// Hash palsu untuk menyamakan waktu respons: username yang tidak ada tetap menjalankan bcrypt,
// sehingga waktu respons tidak membocorkan apakah username tersebut terdaftar.
let dummyHash: string | null = null;
const getDummyHash = () => (dummyHash ??= bcrypt.hashSync(`timing-${Math.random()}`, 10));

/**
 * Mengembalikan { token, user } kalau kredensial benar, null kalau salah (username tidak ada ATAU password salah,
 * sengaja tidak dibedakan). Melempar error hanya untuk kegagalan sistem (mis. database tidak terjangkau).
 */
export async function loginAdmin(username: string, password: string) {
    const { data, error } = await supabase
        .from('admins')
        .select('*')
        .eq('username', username)
        .maybeSingle();

    if (error) {
        console.error('[auth] gagal membaca data admin:', error.message);
        throw new Error('Layanan login tidak tersedia');
    }

    const isValidPassword = await bcrypt.compare(password, data?.password_hash ?? getDummyHash());

    if (!data || !isValidPassword) {
        return null;
    }

    const payload = {
        id: data.id,
        username: data.username,
        name: data.name,
        role: data.role || 'superadmin'
    };

    const token = await new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
        .setIssuedAt()
        .setExpirationTime(`${SESSION_TTL_SECONDS}s`)
        .sign(getJwtSecret());

    return { token, user: payload };
}
