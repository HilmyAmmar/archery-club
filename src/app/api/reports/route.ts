import { NextResponse } from 'next/server';
import { requireAdmin } from '@/app/lib/auth';
import { getMonthlyReportService, getExpenseCategoryService } from '@/services/report.service';

export async function GET(request: Request) {
  const auth = await requireAdmin(request);
  if ('error' in auth) return auth.error;

  try {
    const [monthly, categories] = await Promise.all([
      getMonthlyReportService(),
      getExpenseCategoryService()
    ]);

    return NextResponse.json({
      success: true,
      data: {
        monthly,
        categories
      }
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}