import { NextResponse } from 'next/server';
import { getMonthlyReportService, getExpenseCategoryService } from '@/services/report.service';

export async function GET() {
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