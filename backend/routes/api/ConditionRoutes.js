const express = require('express');
const ConditionController = require('../../controllers/ConditionController')
const router = express.Router();

// @route   GET /api/formData/bloodtypes
// @desc    get all bloodtypes
// @access  Public
router.get("/GetConditions",ConditionController.GetConditions);

module.exports = router; 