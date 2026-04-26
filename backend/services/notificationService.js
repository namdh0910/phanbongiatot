/**
 * Notification Service: Handles Zalo OA, SMS, and Push Notifications.
 * Giai đoạn 1: Mô phỏng Zalo OA API (ready for production integration).
 */

const sendZaloNotification = async (phone, message) => {
  // Mô phỏng call Zalo OA API
  console.log(`[ZALO OA] Gửi tin tới ${phone}: ${message}`);
  // return await axios.post('https://openapi.zalo.me/v2.0/oa/message/transaction', ...)
  return true;
};

const sendSMS = async (phone, message) => {
  // Mô phỏng call SMS Gateway (Esms/Vietguys)
  console.log(`[SMS BACKUP] Gửi tin tới ${phone}: ${message}`);
  return true;
};

const notifyOrderReceived = async (order) => {
  const message = `Đơn hàng ${order.orderCode} đã được xác nhận. Theo dõi tại: phanbongiatot.com/tra-cuu-don-hang`;
  await sendZaloNotification(order.customerInfo.phone, message);
};

const notifyOrderConfirmed = async (order) => {
  const message = `✅ Đơn hàng ${order.orderCode} đã được xác nhận. Chúng tôi đang đóng gói và sẽ giao sớm nhất!`;
  await sendZaloNotification(order.customerInfo.phone, message);
};

const notifyOrderShipping = async (order, trackingCode) => {
  const message = `🚚 Đơn hàng ${order.orderCode} đang trên đường giao. Mã vận đơn: ${trackingCode}. Theo dõi tại: phanbongiatot.com/tra-cuu-don-hang`;
  await sendZaloNotification(order.customerInfo.phone, message);
};

const notifyOrderSuccess = async (order) => {
  const message = `🌟 Chúc mừng anh/chị đã nhận được đơn hàng ${order.orderCode}. Hy vọng sản phẩm mang lại hiệu quả cao cho vườn!`;
  await sendZaloNotification(order.customerInfo.phone, message);
};

module.exports = {
  notifyOrderReceived,
  notifyOrderConfirmed,
  notifyOrderShipping,
  notifyOrderSuccess
};
