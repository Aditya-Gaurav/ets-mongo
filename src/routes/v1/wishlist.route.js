const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const wishlistValidation = require('../../validations/wishlist.validation');
const wishlistController = require('../../controllers/wishlist/wishlist.controller');

const router = express.Router();

router
  .route('/')
  .post( wishlistController.createWishlist)
  .get( wishlistController.getAllWishlist);

router
  .route('/:wishlistId')
  .get( wishlistController.getWishlist)
  .patch(  wishlistController.updateWishlist)
  .delete(  wishlistController.deleteWishlist);

module.exports = router;