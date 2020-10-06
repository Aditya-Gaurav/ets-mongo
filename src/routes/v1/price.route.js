const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const priceValidation = require('../../validations/price.validation');
const priceController = require('../../controllers/price/price.controller');

const router = express.Router();

router
  .route('/')
  .post(  priceController.createPrice)
  .get( validate(priceValidation.getPrices), priceController.getPrices);

router
  .route('/:priceId')
  .get(validate(priceValidation.getPrice), priceController.getPrice)
  .patch( validate(priceValidation.updatePrice), priceController.updatePrice)
  .delete( validate(priceValidation.deletePrice), priceController.deletePrice);

module.exports = router;