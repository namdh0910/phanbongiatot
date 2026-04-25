/**
 * Giai đoạn 1 (MVP): Mô phỏng tính phí ship GHN theo tỉnh thành.
 * Sau này có API Key thật sẽ thay thế bằng call axios tới GHN.
 */

const SHIPPING_FEES = {
  // Khu vực 1: Miền Nam (Gần kho - Giả sử kho ở HCM/Đồng Nai)
  'Hồ Chí Minh': 25000,
  'Đồng Nai': 25000,
  'Bình Dương': 25000,
  'Long An': 30000,
  'Tiền Giang': 30000,
  'Bến Tre': 35000,
  'Đồng Tháp': 35000,
  
  // Khu vực 2: Tây Nguyên (Khách hàng mục tiêu chính)
  'Lâm Đồng': 45000,
  'Đắk Lắk': 50000,
  'Gia Lai': 50000,
  'Đắk Nông': 45000,
  'Kon Tum': 55000,
  
  // Khu vực 3: Miền Trung & Miền Bắc
  'Hà Nội': 65000,
  'Đà Nẵng': 50000,
};

const DEFAULT_FEE = 60000;

const calculateShippingFee = async (province, weightInGram = 5000) => {
  // Mô phỏng độ trễ của API 300ms
  await new Promise(resolve => setTimeout(resolve, 300));

  let baseFee = SHIPPING_FEES[province] || DEFAULT_FEE;
  
  // Giả sử cứ mỗi 1kg trên 5kg thì cộng thêm 5000đ
  if (weightInGram > 5000) {
    const extraWeight = Math.ceil((weightInGram - 5000) / 1000);
    baseFee += extraWeight * 5000;
  }

  return baseFee;
};

module.exports = { calculateShippingFee };
