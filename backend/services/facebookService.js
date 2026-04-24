const axios = require('axios');

/**
 * Đăng bài viết (Link + Text) lên Facebook Page
 * @param {Object} postData - { message, link, imageUrl }
 */
const publishToFacebookPage = async (postData) => {
  const pageId = process.env.FACEBOOK_PAGE_ID;
  const accessToken = process.env.FACEBOOK_PAGE_ACCESS_TOKEN;

  if (!pageId || !accessToken) {
    throw new Error('Chưa cấu hình FACEBOOK_PAGE_ID hoặc FACEBOOK_PAGE_ACCESS_TOKEN trong .env');
  }

  try {
    const url = `https://graph.facebook.com/v19.0/${pageId}/feed`;
    
    // Facebook Graph API params
    const payload = {
      message: postData.message,
      link: postData.link,
      access_token: accessToken,
    };

    const response = await axios.post(url, payload);
    return response.data; // { id: "post_id" }
  } catch (error) {
    console.error('Lỗi khi đăng lên Facebook:', error.response?.data || error.message);
    throw new Error(error.response?.data?.error?.message || 'Không thể đăng bài lên Facebook');
  }
};

module.exports = {
  publishToFacebookPage
};
