import { NextResponse } from 'next/server';
import { requireAdmin } from '@/app/lib/auth';
import { getDashboardDataService } from '@/services/dashboard.service';

export async function GET(request: Request) {
  const auth = await requireAdmin(request);
  if ('error' in auth) return auth.error;

  try {
    const data = await getDashboardDataService();
    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}