const httpStatus = require('http-status');
const pick = require('../../utils/pick');
const ApiError = require('../../utils/ApiError');
const catchAsync = require('../../utils/catchAsync');
const { cartService } = require('../../services');

const createCart = catchAsync(async (req, res) => {
  const cart = await cartService.createCart(req.body);
  res.status(httpStatus.CREATED).send(cart);
});

const getAllCart = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await cartService.getCarts(filter, options);
  res.send(result);
});

const getCart = catchAsync(async (req, res) => {
  const cart = await cartService.getCart(req.params.cartId);
  if (!cart) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Cart not found');
  }
  res.send(Cart);
});

const updateCart = catchAsync(async (req, res) => {
  const user = await cartService.updateCart(req.params.userId, req.body);
  res.send(user);
});

const deleteCart = catchAsync(async (req, res) => {
  await cartService.deleteCart(req.params.cartId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {createCart, getAllCart, getCart, updateCart, deleteCart}