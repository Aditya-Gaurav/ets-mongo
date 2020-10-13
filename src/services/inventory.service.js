const httpStatus = require('http-status');
const { Inventory } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a Inventory
 * @param {Object} InventoryBody
 * @returns {Promise<Inventory>}
*/
const createInventory = async (inventoryBody) => {
  console.log("inventoryBody", inventoryBody); 
  query = {'itemId': inventoryBody.itemId},
    update = {
      $set: {itemId: inventoryBody.itemId},
      $push: {vars: inventoryBody.vars[0]}
  },
  
  options = {upsert: true, useFindAndModify: false};
  const inventory = await Inventory.findOneAndUpdate(query, update, options);
  return inventory;

};

/**
 * Query for users
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const getAllInventory = async (filter, options) => {
  const  allInventory = await Inventory.paginate(filter, options);
  return allInventory;
};



/**
 * Get Inventory by id
 * @param {ObjectId} id
 * @returns {Promise<Inventory>}
 */
const getInventory = async (id) => {
  return Inventory.findById(id);
};


/**
 * Delete Inventory by id
 * @param {ObjectId} InventoryId
 * @returns {Promise<Inventory>}
 */
const deleteInventory = async (inventoryId) => {
  const inventory = await getInventoryById(inventoryId);
  if (!inventory) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Inventory not found');
  }
  await Inventory.remove();
  return inventory;
};


module.exports = {createInventory, getAllInventory, getInventory, deleteInventory}