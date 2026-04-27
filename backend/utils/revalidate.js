const axios = require('axios');

/**
 * Triggers on-demand revalidation in the Next.js frontend
 * @param {string[]} paths - List of paths to revalidate (e.g. ['/', '/san-pham/rooti'])
 */
const triggerRevalidate = async (paths) => {
  try {
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
    const secret = process.env.REVALIDATE_SECRET;

    if (!secret) {
      console.warn('[REVALIDATE] Missing REVALIDATE_SECRET in .env');
      return;
    }

    await axios.post(`${frontendUrl}/api/revalidate`, {
      secret,
      paths
    });
    
    console.log(`[REVALIDATE] Successfully triggered for paths: ${paths.join(', ')}`);
  } catch (error) {
    console.error(`[REVALIDATE] Failed to trigger: ${error.message}`);
  }
};

module.exports = { triggerRevalidate };
