const express = require('express');
const GenderController = require('../../controllers/GenderController')
const router = express.Router();

// @route   GET /api/formData/bloodtypes
// @desc    get all bloodtypes
// @access  Public
router.get("/GetGenders",GenderController.GetGenders);

module.exports = router; 