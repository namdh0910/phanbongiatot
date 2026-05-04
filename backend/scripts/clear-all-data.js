/**
 * SCRIPT: Xóa toàn bộ dữ liệu mẫu
 * Giữ lại: Tài khoản admin
 * Xóa: Sản phẩm, Blog, Đơn hàng, Flash Sale, Combo, Lead, Đánh giá, Seller Applications
 */
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config(); // Load từ backend/.env (thư mục hiện tại)

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error('❌ Lỗi: Không tìm thấy MONGO_URI trong file .env');
  process.exit(1);
}

const COLLECTIONS_TO_CLEAR = [
  'products',
  'blogs',
  'orders',
  'flashsales',
  'combos',
  'leads',
  'reviews',
  'sellerapplications',
  'sellers',
  'carts',
  'coupons',
];

// Các users KHÔNG phải admin sẽ bị xóa
async function clearData() {
  console.log('\n🔄 Đang kết nối MongoDB...');
  await mongoose.connect(MONGO_URI);
  console.log('✅ Kết nối thành công!\n');

  const db = mongoose.connection.db;

  // 1. Xóa tất cả collections theo danh sách
  for (const col of COLLECTIONS_TO_CLEAR) {
    try {
      const result = await db.collection(col).deleteMany({});
      console.log(`🗑️  Đã xóa [${col}]: ${result.deletedCount} documents`);
    } catch (err) {
      // Collection không tồn tại thì bỏ qua
      if (err.code !== 26) console.warn(`   ⚠️  Bỏ qua [${col}]:`, err.message);
    }
  }

  // 2. Xóa tất cả users KHÔNG phải admin/super_admin
  const usersResult = await db.collection('users').deleteMany({
    role: { $nin: ['admin', 'super_admin'] }
  });
  console.log(`\n👥 Đã xóa ${usersResult.deletedCount} user không phải admin`);

  // 3. Kiểm tra admin còn lại
  const admins = await db.collection('users').find({ role: { $in: ['admin', 'super_admin'] } }).toArray();
  console.log(`\n✅ Còn lại ${admins.length} tài khoản admin:`);
  admins.forEach(a => console.log(`   - ${a.username} (${a.role})`));

  console.log('\n🎉 Xóa dữ liệu mẫu hoàn tất! Hệ thống sạch, sẵn sàng nhập dữ liệu thật.\n');
  
  await mongoose.disconnect();
  process.exit(0);
}

clearData().catch(err => {
  console.error('\n❌ Lỗi:', err.message);
  process.exit(1);
});
