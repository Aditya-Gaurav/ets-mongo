const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const cartValidation = require('../../validations/cart.validation');
const cartController = require('../../controllers/cart/cart.controller');

const router = express.Router();

router
  .route('/')
  .post( validate(cartValidation.createCart), cartController.createCart)
  .get( validate(cartValidation.getAllCart), cartController.getAllCart);

router
  .route('/:cartId')
  .get(validate(cartValidation.getCart), cartController.getCart)
  .patch( validate(cartValidation.updateCart), cartController.updateCart)
  .delete( validate(cartValidation.deleteCart), cartController.deleteCart);

module.exports = router;