const httpStatus = require('http-status');
const pick = require('../../utils/pick');
const ApiError = require('../../utils/ApiError');
const catchAsync = require('../../utils/catchAsync');
const { itemService } = require('../../services');

const createItem = catchAsync(async (req, res) => {
  const item = await itemService.createItem(req.body);
  res.status(httpStatus.CREATED).send(item);
});

const getItems = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await itemService.queryItems(filter, options);
  res.send(result);
});

const getItem = catchAsync(async (req, res) => {
  const item = await itemService.getItemById(req.params.itemId);
  if (!item) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Item not found');
  }
  res.send(item);
});

const updateItem = catchAsync(async (req, res) => {
  const user = await itemService.updateUserById(req.params.userId, req.body);
  res.send(user);
});

const deleteItem = catchAsync(async (req, res) => {
  await itemService.deleteItemById(req.params.itemId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {createItem, getItem, getItems, updateItem, deleteItem}