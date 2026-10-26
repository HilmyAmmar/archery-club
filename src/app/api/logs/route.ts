import { NextResponse } from 'next/server';
import { requireAdmin } from '@/app/lib/auth';
import { supabase } from '@/app/lib/supabase';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const auth = await requireAdmin(request);
  if ('error' in auth) return auth.error;

    try {
        const { data, error } = await supabase
            .from('activity_logs')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(100);

        if (error) throw new Error(error.message);

        return NextResponse.json({ success: true, data });
    } catch (error: any) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}