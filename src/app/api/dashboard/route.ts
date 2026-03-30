import { NextResponse } from 'next/server';
import { getDashboardDataService } from '@/services/dashboard.service';

export async function GET() {
  try {
    const data = await getDashboardDataService();
    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}