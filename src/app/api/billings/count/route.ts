import { NextResponse } from 'next/server';
import { supabase } from "@/app/lib/supabase"; 

export async function GET() {
  try {
    const { count, error } = await supabase
      .from('members')
      .select('*', { count: 'exact', head: true })
      .in('status_member', ['aktif', 'cuti']);

    if (error) throw error;

    return NextResponse.json({ success: true, count: count || 0 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}