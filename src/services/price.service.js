const httpStatus = require('http-status');
const { Price } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a Price
 * @param {Object} priceBody
 * @returns {Promise<Price>}
*/
const createPrice = async (priceBody) => {
  console.log("priceBody", priceBody)
  const price = await Price.create(priceBody);
  return price;
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
const getPrices = async (filter, options) => {
  const prices = await Price.paginate(filter, options);
  return prices;
};

/**
 * Get Price by id
 * @param {ObjectId} id
 * @returns {Promise<Price>}
 */
const getPrice = async (id) => {
  return Price.findById(id);
};


/**
 * Delete Price by id
 * @param {ObjectId} PriceId
 * @returns {Promise<Price>}
 */
const deletePriceById = async (priceId) => {
  const price = await getFacetById(priceId);
  if (!price) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Price not found');
  }
  await Price.remove();
  return price;
};


module.exports = {createPrice, getPrice, getPrices, deletePriceById}