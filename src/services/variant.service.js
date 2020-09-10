const httpStatus = require('http-status');
const { Variant } = require('../models');
const { Item } = require('../models');

const ApiError = require('../utils/ApiError');

/**
 * Create a variant
 * @param {ObjectId} itemId
 * @param {Object} variantBody
 * @returns {Promise<variant>}
*/
const createVariant = async (itemId, variantBody) => {
	console.log(itemId);
	if(!(await Item.isItemAvailable(itemId))){
		throw new ApiError(httpStatus.BAD_REQUEST, 'Item doesn\'t exists')
	}
  const variant = await Variant.create(variantBody);
  return variant;
};

/**
 * Get variant by itemId
 * @param {ObjectId} itemId
 * @param {ObjectId} id
 * @returns {Promise<variant>}
 */
const getVariants = async (itemId) => {
  if(!(await Item.isItemAvailable(itemId))){
		throw new ApiError(httpStatus.BAD_REQUEST, 'Item doesn\'t exists')
	}
  return Variant.find({itemId});
};



/**
 * Get variant by id
 * @param {ObjectId} itemId
 * @param {ObjectId} id
 * @returns {Promise<variant>}
 */
const getVariantById = async (itemId, variantId) => {
  if(!(await Item.isItemAvailable(itemId))){
		throw new ApiError(httpStatus.BAD_REQUEST, 'Item doesn\'t exists')
	}
  return Variant.findById(variantId);
};


/**
 * Delete variant by id
 * @param {ObjectId} itemId
 * @param {ObjectId} variantId
 * @returns {Promise<variant>}
 */
const deleteVariantById = async (itemId, variantId) => {
 
  const variant = await getVariantById(itemId, variantId);
  if (!variant) {
    throw new ApiError(httpStatus.NOT_FOUND, 'variant not found');
  }
  await Variant.remove();
  return variant;
};


module.exports = {createVariant, getVariants, getVariantById, deleteVariantById}