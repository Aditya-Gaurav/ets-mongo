const httpStatus = require('http-status');
const pick = require('../../utils/pick');
const ApiError = require('../../utils/ApiError');
const catchAsync = require('../../utils/catchAsync');
const { brandService } = require('../../services');

const createBrand = catchAsync(async (req, res) => {
  const brand = await brandService.createBrand(req.body);
  res.status(httpStatus.CREATED).send(brand);
});

const getBrands = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await brandService.getBrands(filter, options);
  res.send(result);
});

const getBrand = catchAsync(async (req, res) => {
  const brand = await brandService.getBrandById(req.params.brandId);
  if (!brand) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Brand not found');
  }
  res.send(brand);
});

const updateBrand = catchAsync(async (req, res) => {
  const user = await brandService.updateUserById(req.params.userId, req.body);
  res.send(user);
});

const deleteBrand = catchAsync(async (req, res) => {
  await brandService.deleteBrandById(req.params.brandId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {createBrand, getBrand, getBrands, updateBrand, deleteBrand}