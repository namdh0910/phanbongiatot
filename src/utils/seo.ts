export function generateHashtags(title: string, content: string): string[] {
  const commonTags = ['nongnghiep', 'phanbongiatot', 'kythuatcaytrong', 'phuchoivuon', 'huuco'];
  const keywords = [
    { word: 'sầu riêng', tag: 'saurieng' },
    { word: 'cà phê', tag: 'caphe' },
    { word: 'vàng lá', tag: 'vangla' },
    { word: 'thối rễ', tag: 'thoire' },
    { word: 'tuyến trùng', tag: 'tuyentrung' },
    { word: 'kích rễ', tag: 'kichre' },
    { word: 'phục hồi', tag: 'phuchoi' }
  ];

  const text = (title + ' ' + content).toLowerCase();
  const tags = new Set<string>();

  keywords.forEach(kw => {
    if (text.includes(kw.word)) {
      tags.add(kw.tag);
    }
  });

  // Fill up to 5 tags
  let i = 0;
  while (tags.size < 5 && i < commonTags.length) {
    tags.add(commonTags[i]);
    i++;
  }

  return Array.from(tags).slice(0, 5);
}

export function generateSEODescription(content: string): string {
  // Strip HTML if any, take first 155 chars
  const stripped = content.replace(/<[^>]*>/g, '').replace(/[#*`]/g, '').trim();
  return stripped.length > 155 ? stripped.substring(0, 152) + '...' : stripped;
}
