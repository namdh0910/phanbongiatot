const Lead = require('../models/Lead');

// @desc    Get all leads
// @route   GET /api/leads
const getLeads = async (req, res) => {
  try {
    const leads = await Lead.find({}).sort({ createdAt: -1 });
    res.json(leads);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a lead
// @route   POST /api/leads
const createLead = async (req, res) => {
  try {
    const { name, phone, message, product, cropType, area } = req.body;

    // Validate bắt buộc
    if (!name || !phone) {
      return res.status(400).json({ message: 'Họ tên và số điện thoại không được để trống' });
    }

    // Validate SĐT Việt Nam
    const phoneRegex = /^(03|05|07|08|09)\d{8}$/;
    if (!phoneRegex.test(phone.replace(/\s/g, ''))) {
      return res.status(400).json({ message: 'Số điện thoại không hợp lệ' });
    }

    const lead = await Lead.create({ name, phone, message, product, cropType, area });
    res.status(201).json(lead);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update lead status
// @route   PUT /api/leads/:id/status
const updateLeadStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const lead = await Lead.findById(req.params.id);

    if (lead) {
      lead.status = status;
      if (status === 'called') lead.isContacted = true;
      const updatedLead = await lead.save();
      res.json(updatedLead);
    } else {
      res.status(404).json({ message: 'Lead not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { getLeads, createLead, updateLeadStatus };
