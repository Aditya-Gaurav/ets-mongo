const httpStatus = require('http-status');
const pick = require('../../utils/pick');
const ApiError = require('../../utils/ApiError');
const catchAsync = require('../../utils/catchAsync');
const { inventoryService } = require('../../services');
const { Inventory } = require('../../models');
const { Console } = require('winston/lib/winston/transports');


const createInventory = catchAsync(async (req, res) => {
  const inventory = await inventoryService.createInventory(req.body);
  res.status(httpStatus.CREATED).send(inventory);
});

const getAllInventory = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await inventoryService.getAllInventory(filter, options);
  res.send(result);
});

const getInventory = catchAsync(async (req, res) => {
  const inventory = await inventoryService.getInventory(req.params.inventoryId);
  if (!inventory) {
    throw new ApiError(httpStatus.NOT_FOUND, 'inventory not found');
  }
  res.send(inventory);
});

const updateInventory = catchAsync(async (req, res) => {
  // const user = await inventoryService.updateInventory(req.params.userId, req.body);
  // res.send(user);
});

const deleteInventory = async (req, res) => {
  // const inventory = await getInventoryById(inventoryId);
  // if (!inventory) {
  //   throw new ApiError(httpStatus.NOT_FOUND, 'Inventory not found');
  // }
  // await Inventory.remove();
  // return inventory;
};


module.exports = {createInventory, getInventory, getAllInventory, updateInventory, deleteInventory}