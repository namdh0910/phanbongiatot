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
  const message = `🌱 Đơn hàng ${order.orderCode} đã được nhận. Chúng tôi sẽ gọi xác nhận trong 30 phút. Trân trọng!`;
  await sendZaloNotification(order.customerInfo.phone, message);
};

const notifyOrderConfirmed = async (order) => {
  const message = `✅ Đơn hàng ${order.orderCode} đã được xác nhận. Dự kiến giao đến anh/chị vào ngày ${new Date(Date.now() + 3*24*60*60*1000).toLocaleDateString('vi-VN')}.`;
  await sendZaloNotification(order.customerInfo.phone, message);
};

const notifyOrderShipping = async (order, trackingCode) => {
  const message = `🚚 Đơn hàng ${order.orderCode} đang trên đường giao. Mã vận đơn: ${trackingCode}. Theo dõi tại: phanbongiatot.com/tra-cuu`;
  await sendZaloNotification(order.customerInfo.phone, message);
};

const notifyOrderSuccess = async (order) => {
  const message = `🌟 Cảm ơn anh/chị đã nhận hàng ${order.orderCode}. Hãy để lại đánh giá để nhận Voucher 20K cho đơn sau nhé: phanbongiatot.com/danh-gia`;
  await sendZaloNotification(order.customerInfo.phone, message);
};

module.exports = {
  notifyOrderReceived,
  notifyOrderConfirmed,
  notifyOrderShipping,
  notifyOrderSuccess
};
