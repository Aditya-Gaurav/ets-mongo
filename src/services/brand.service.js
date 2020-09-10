const httpStatus = require('http-status');
const { Brand } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a Brand
 * @param {Object} BrandBody
 * @returns {Promise<Brand>}
*/
const createBrand = async (brandBody) => {
  const brand = await Brand.create(brandBody);
  return brand;
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
const getBrands = async (filter, options) => {
  const brands = await Brand.paginate(filter, options);
  return brands;
};



/**
 * Get Brand by id
 * @param {ObjectId} id
 * @returns {Promise<Brand>}
 */
const getBrandById = async (id) => {
  return Brand.findById(id);
};


/**
 * Delete Brand by id
 * @param {ObjectId} BrandId
 * @returns {Promise<Brand>}
 */
const deleteBrandById = async (brandId) => {
  const brand = await getBrandById(brandId);
  if (!brand) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Brand not found');
  }
  await Brand.remove();
  return brand;
};


module.exports = {createBrand, getBrands, getBrandById, deleteBrandById}