const SellerApplication = require('../models/SellerApplication');
const { sendTelegramMessage } = require('../utils/telegram');

// @desc    Register a new seller application
// @route   POST /api/sellers/register
// @access  Public
const registerSeller = async (req, res) => {
  try {
    const application = new SellerApplication(req.body);
    const createdApplication = await application.save();

    // Send Telegram Notification
    const message = `
<b>🔔 ĐĂNG KÝ SELLER MỚI!</b>
------------------------
👤 <b>Họ tên:</b> ${createdApplication.fullName}
📞 <b>SĐT:</b> ${createdApplication.phone}
🏪 <b>Shop:</b> ${createdApplication.storeName}
📍 <b>Tỉnh:</b> ${createdApplication.province}
💼 <b>Loại hình:</b> ${createdApplication.businessType}
------------------------
<i>Duyệt ngay tại: phanbongiatot.vercel.app/admin/vendors</i>
    `;
    
    await sendTelegramMessage(message);

    res.status(201).json(createdApplication);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all seller applications
// @route   GET /api/sellers/applications
// @access  Private/Admin
const getApplications = async (req, res) => {
  try {
    const applications = await SellerApplication.find({}).sort({ createdAt: -1 });
    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update application status (approve/reject)
// @route   PUT /api/sellers/applications/:id/status
// @access  Private/Admin
const updateApplicationStatus = async (req, res) => {
  try {
    const { status, reason } = req.body;
    const application = await SellerApplication.findById(req.params.id);

    if (application) {
      application.status = status;
      application.rejectionReason = reason || '';
      application.reviewedBy = req.user._id;
      application.reviewedAt = Date.now();

      const updatedApplication = await application.save();
      
      // TODO: Trigger Email/Zalo OA notification to seller here
      
      res.json(updatedApplication);
    } else {
      res.status(404).json({ message: 'Không tìm thấy đơn đăng ký' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  registerSeller,
  getApplications,
  updateApplicationStatus,
};
