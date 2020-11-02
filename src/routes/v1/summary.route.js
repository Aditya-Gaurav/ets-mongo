const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const summaryValidation = require('../../validations/summary.validation');
const summaryController = require('../../controllers/summary/summary.controller');

const router = express.Router();

router
  .route('/')
  .post(summaryController.createSummary)
  .get( validate(summaryValidation.getAllSummary), summaryController.getAllSummary);
  router.route('/getProductAttr').get(summaryController.getProductAttr)  
router
  .route('/:summaryId')
  .get(validate(summaryValidation.getSummary), summaryController.getSummary)
  .patch( validate(summaryValidation.updateSummary), summaryController.updateSummary)
  .delete( validate(summaryValidation.deleteSummary), summaryController.deleteSummary);

module.exports = router;