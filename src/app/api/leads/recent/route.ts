import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Lead from '@/lib/models/Lead';

export async function GET() {
  try {
    await dbConnect();
    
    // Get latest 10 leads, sorted by creation date
    const leads = await Lead.find({})
      .sort({ createdAt: -1 })
      .limit(10)
      .select('name city pathology createdAt');

    // Anonymize names and format data
    const anonymizedLeads = leads.map(lead => {
      const nameParts = lead.name.split(' ');
      const firstName = nameParts[0] || 'Khách';
      const lastInitial = nameParts.length > 1 ? nameParts[nameParts.length - 1][0] : '*';
      
      return {
        name: `${firstName} ${lastInitial}***`,
        location: lead.city || 'Việt Nam',
        action: `vừa gửi yêu cầu tư vấn ${lead.pathology || 'kỹ thuật'}`,
        time: formatTimeAgo(lead.createdAt)
      };
    });

    return NextResponse.json(anonymizedLeads);
  } catch (error) {
    // Fallback to mock data if DB fails
    return NextResponse.json([
      { name: "Anh B***", location: "Gia Lai", action: "vừa được tư vấn trị tuyến trùng", time: "2 phút trước" },
      { name: "Chú N***", location: "Đồng Nai", action: "đã đặt giải pháp phục hồi", time: "5 phút trước" }
    ]);
  }
}

function formatTimeAgo(date: Date) {
  const seconds = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000);
  if (seconds < 60) return 'Vừa xong';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} phút trước`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} giờ trước`;
  return `${Math.floor(hours / 24)} ngày trước`;
}
