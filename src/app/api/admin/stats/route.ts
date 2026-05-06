import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Analytics from '@/lib/models/Analytics';
import Lead from '@/lib/models/Lead';

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    
    // Thống kê tổng quát (tổng từ trước đến nay)
    const totalViews = await Analytics.countDocuments({ type: 'page_view' });
    const totalZalo = await Analytics.countDocuments({ type: 'zalo_click' });
    const totalCall = await Analytics.countDocuments({ type: 'call_click' });
    const totalLeads = await Lead.countDocuments();

    // Thống kê theo 7 ngày gần nhất để vẽ biểu đồ
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const dailyStats = await Analytics.aggregate([
      { $match: { createdAt: { $gte: sevenDaysAgo } } },
      {
        $group: {
          _id: { 
            date: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
            type: "$type"
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { "_id.date": 1 } }
    ]);

    // Format lại dữ liệu cho biểu đồ dễ dùng ở frontend
    const formattedStats = dailyStats.reduce((acc: any, curr: any) => {
      const date = curr._id.date;
      if (!acc[date]) acc[date] = { date, page_view: 0, zalo_click: 0, call_click: 0, lead_submit: 0 };
      acc[date][curr._id.type] = curr.count;
      return acc;
    }, {});

    // Lấy top 5 trang được xem nhiều nhất
    const topPages = await Analytics.aggregate([
      { $match: { type: 'page_view' } },
      { $group: { _id: "$path", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 }
    ]);

    return NextResponse.json({
      summary: { totalViews, totalZalo, totalCall, totalLeads },
      chartData: Object.values(formattedStats),
      topPages
    });
  } catch (error) {
    console.error('Stats error:', error);
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 });
  }
}
