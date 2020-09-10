const httpStatus = require('http-status');
const pick = require('../../utils/pick');
const ApiError = require('../../utils/ApiError');
const catchAsync = require('../../utils/catchAsync');
const { variantService } = require('../../services');

const createVariant = catchAsync(async (req, res) => {
  const variant = await variantService.createVariant(req.params.itemId, req.body);
  res.status(httpStatus.CREATED).send(variant);
});

const getVariants = catchAsync(async (req, res) => {
  const result = await variantService.getVariants(req.params.itemId);
  res.send(result);
});

const getVariant = catchAsync(async (req, res) => {
  const variant = await variantService.getVariantById(req.params.itemId, req.params.variantId);
  if (!variant) {
    throw new ApiError(httpStatus.NOT_FOUND, 'variant not found');
  }
  res.send(variant);
});

const updateVariant = catchAsync(async (req, res) => {
  const user = await variantService.updateVariantById(req.params.itemId, req.body);
  res.send(user);
});

const deleteVariant = catchAsync(async (req, res) => {
  await variantService.deleteVariantById(req.params.itemId, req.params.variantId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {createVariant, getVariant, getVariants, updateVariant, deleteVariant}