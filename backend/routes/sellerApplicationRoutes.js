const express = require('express');
const router = express.Router();
const {
  registerSeller,
  getApplications,
  updateApplicationStatus,
} = require('../controllers/sellerApplicationController');
const { protect } = require('../middleware/authMiddleware');

router.post('/register', registerSeller);
router.get('/applications', protect, getApplications);
router.put('/applications/:id/status', protect, updateApplicationStatus);

module.exports = router;
