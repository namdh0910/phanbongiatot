const express = require('express');
const router = express.Router();
const { getLeads, createLead, updateLeadStatus } = require('../controllers/leadController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, getLeads).post(createLead);
router.route('/:id/status').put(protect, updateLeadStatus);

module.exports = router;
