const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const cartValidation = require('../../validations/cart.validation');
const cartController = require('../../controllers/cart/cart.controller');

const router = express.Router();

router
  .route('/')
  .post(  cartController.createCart)
  .get(  cartController.getAllCart);

router
  .route('/:cartId')
  .get( cartController.getCart)
  .patch(  cartController.updateCart)
  .delete(  cartController.deleteCart);

module.exports = router;