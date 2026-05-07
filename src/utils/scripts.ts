export const ADVISORY_SCRIPTS = [
  {
    category: 'Vàng lá thối rễ',
    symptoms: ['vàng lá', 'thối rễ', 'suy rễ'],
    script: (name: string, location: string) => 
      `Chào anh/chị ${name}, em là đội ngũ tư vấn từ Phân Bón Giá Tốt. \n\n` +
      `Về tình trạng vườn ở ${location || 'vùng mình'} đang bị vàng lá thối rễ, anh/chị cần xử lý gấp như sau:\n` +
      `1. Kiểm tra pH đất (đưa về 5.5-6.5).\n` +
      `2. Xử lý nấm Phytophthora/Fusarium bằng Nemano.\n` +
      `3. Sau 5-7 ngày dùng Humic K-Max kích rễ tơ.\n\n` +
      `Anh/chị chụp ảnh rễ tơ gửi em xem để chẩn đoán chính xác hơn nhé.`
  },
  {
    category: 'Tuyến trùng',
    symptoms: ['tuyến trùng', 'sưng rễ', 'u rễ'],
    script: (name: string, location: string) => 
      `Chào anh/chị ${name}, đội ngũ Phân Bón Giá Tốt xin tư vấn cho vườn ở ${location || 'vùng mình'}:\n\n` +
      `Tình trạng sưng rễ/u rễ là do Tuyến trùng tấn công. Anh/chị dùng ngay bộ đôi tiêu diệt Tuyến trùng và nấm cộng sinh. Tuyệt đối không bón phân hóa học lúc này sẽ làm bệnh nặng hơn. \n\n` +
      `Anh/chị cần em gửi hình mẫu thuốc không ạ?`
  },
  {
    category: 'Tư vấn chung',
    symptoms: [],
    script: (name: string, location: string) => 
      `Dạ chào anh/chị ${name} ở ${location || 'vùng mình'}, em thấy anh/chị đang cần tư vấn kỹ thuật phục hồi vườn.\n\n` +
      `Vườn nhà mình hiện tại cây mấy năm tuổi và đang gặp biểu hiện như thế nào ở lá/thân/rễ ạ? Anh/chị gửi ảnh hoặc video ngắn em xem tình hình cụ thể nhé.`
  }
];

export function getScriptForLead(lead: any) {
  const text = `${lead.pathology || ''} ${lead.symptoms || ''}`.toLowerCase();
  const match = ADVISORY_SCRIPTS.find(s => s.symptoms.some(sym => text.includes(sym)));
  const template = match || ADVISORY_SCRIPTS[ADVISORY_SCRIPTS.length - 1];
  return template.script(lead.name || 'bà con', lead.city || lead.address || '');
}
