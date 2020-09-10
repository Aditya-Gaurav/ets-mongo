const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const brandValidation = require('../../validations/brand.validation');
const brandController = require('../../controllers/brand/brand.controller');

const router = express.Router();

router
  .route('/')
  .post( validate(brandValidation.createbrand), brandController.createBrand)
  .get( validate(brandValidation.getbrands), brandController.getBrands);

router
  .route('/:brandId')
  .get(validate(brandValidation.getbrand), brandController.getBrand)
  .patch( validate(brandValidation.updatebrand), brandController.updateBrand)
  .delete( validate(brandValidation.deletebrand), brandController.deleteBrand);

module.exports = router;