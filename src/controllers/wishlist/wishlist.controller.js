const httpStatus = require('http-status');
const pick = require('../../utils/pick');
const ApiError = require('../../utils/ApiError');
const catchAsync = require('../../utils/catchAsync');
const { wishlistService } = require('../../services');

const createWishlist = catchAsync(async (req, res) => {
  const wishlist = await wishlistService.createWishlist(req.body);
  res.status(httpStatus.CREATED).send(wishlist);
});

const getAllWishlist = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await wishlistService.getAllWishlist(filter, options);
  res.send(result);
});

const getWishlist = catchAsync(async (req, res) => {
  const wishlist = await wishlistService.getWishlist(req.params.WishlistId);
  if (!wishlist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Wishlist not found');
  }
  res.send(Wishlist);
});

const updateWishlist = catchAsync(async (req, res) => {
  const user = await wishlistService.updateUserById(req.params.userId, req.body);
  res.send(user);
});

const deleteWishlist = catchAsync(async (req, res) => {
  await wishlistService.deleteWishlistById(req.params.WishlistId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {createWishlist, getAllWishlist, getWishlist, updateWishlist, deleteWishlist}