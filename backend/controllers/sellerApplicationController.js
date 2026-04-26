const SellerApplication = require('../models/SellerApplication');
const User = require('../models/User');
const { sendTelegramMessage } = require('../utils/telegram');

// @desc    Register a new seller application
// @route   POST /api/sellers/register
// @access  Public
const registerSeller = async (req, res) => {
  try {
    const { username, phone } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ username });
    if (userExists) {
      return res.status(400).json({ message: 'Tên đăng nhập đã tồn tại' });
    }

    // Check if there is a pending application with same username
    const pendingApp = await SellerApplication.findOne({ username, status: 'pending' });
    if (pendingApp) {
      return res.status(400).json({ message: 'Tên đăng nhập này đang được chờ duyệt' });
    }

    const application = new SellerApplication(req.body);
    const createdApplication = await application.save();

    // Send Telegram Notification to Admin
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
    
    try {
      await sendTelegramMessage(message);
    } catch (err) {
      console.error('Telegram error:', err.message);
    }

    res.status(201).json({ 
      success: true, 
      message: "Đăng ký thành công. Admin sẽ duyệt hồ sơ của bạn trong vòng 24-48h." 
    });
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

    if (!application) {
      return res.status(404).json({ message: 'Không tìm thấy đơn đăng ký' });
    }

    if (application.status !== 'pending') {
      return res.status(400).json({ message: 'Đơn này đã được xử lý rồi' });
    }

    application.status = status;
    application.rejectionReason = reason || '';
    application.reviewedBy = req.user._id;
    application.reviewedAt = Date.now();

    if (status === 'approved') {
      // 1. Create User account for Seller
      const newUser = new User({
        username: application.username,
        password: application.password, // Will be hashed by User model pre-save
        role: 'vendor',
        vendorInfo: {
          storeName: application.storeName,
          phone: application.phone,
          address: `${application.address}, ${application.province}`,
          description: application.description,
          isApproved: true,
          zaloPhone: application.phone
        }
      });

      await newUser.save();

      // 2. Send SMS/Zalo notification (Placeholder logic as requested)
      console.log(`[NOTIFICATION] Gửi tin nhắn đến ${application.phone}: Chúc mừng! Gian hàng ${application.storeName} đã được duyệt. Đăng nhập tại: phanbongiatot.com/kenh-nguoi-ban`);
      
      // In real scenario, call Zalo OA API here
    }

    const updatedApplication = await application.save();
    res.json(updatedApplication);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  registerSeller,
  getApplications,
  updateApplicationStatus,
};
