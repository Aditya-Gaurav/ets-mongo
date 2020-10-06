const httpStatus = require('http-status');
const pick = require('../../utils/pick');
const ApiError = require('../../utils/ApiError');
const catchAsync = require('../../utils/catchAsync');
const { priceService } = require('../../services');

const createPrice = catchAsync(async (req, res) => {
  const price = await priceService.createPrice(req.body);
  res.status(httpStatus.CREATED).send(price);
});

const getPrices = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await priceService.getPrices(filter, options);
  res.send(result);
});

const getPrice = catchAsync(async (req, res) => {
  const price = await priceService.getPrice(req.params.priceId);
  if (!price) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Price not found');
  }
  res.send(price);
});

const updatePrice = catchAsync(async (req, res) => {
  const user = await priceService.updateUserById(req.params.userId, req.body);
  res.send(user);
});

const deletePrice = catchAsync(async (req, res) => {
  await priceService.deletePriceById(req.params.priceId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {createPrice, getPrice, getPrices, updatePrice, deletePrice}