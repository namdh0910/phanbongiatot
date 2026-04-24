const axios = require('axios');

const sendTelegramMessage = async (message) => {
  const token = "8639878806:AAEhQj6ExIEeiriLqJE0rskrOnHP_Ox0GO8";
  const chatId = "7510245559";

  if (!token || !chatId) {
    console.warn('Telegram Bot Token hoặc Chat ID chưa được thiết lập. Bỏ qua gửi thông báo.');
    return;
  }

  try {
    const url = `https://api.telegram.org/bot${token}/sendMessage`;
    await axios.post(url, {
      chat_id: chatId,
      text: message,
      parse_mode: 'HTML',
    });
  } catch (error) {
    console.error('Lỗi gửi thông báo Telegram:', error.response?.data || error.message);
  }
};

module.exports = { sendTelegramMessage };
