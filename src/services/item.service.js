const httpStatus = require('http-status');
const { Item } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a item
 * @param {Object} itemBody
 * @returns {Promise<Item>}
*/
const createItem = async (itemBody) => {
//   if (await User.isEmailTaken(userBody.email)) {
//     throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
//   }
  const item = await User.create(itemBody);
  return item;
};

module.exports = {createItem}