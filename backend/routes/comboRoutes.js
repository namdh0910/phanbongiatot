const express = require('express');
const router = express.Router();
const { getCombos, manageCombo } = require('../controllers/comboController');
const { protect, admin } = require('../middleware/authMiddleware');

router.get('/', getCombos);
router.post('/admin', protect, admin, manageCombo);

module.exports = router;
