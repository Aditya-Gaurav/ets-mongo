const httpStatus = require('http-status');
const { Cart } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a Cart
 * @param {Object} CartBody
 * @returns {Promise<Cart>}
*/
const createCart = async (cartBody) => {
  console.log("CartBody", cartBody);
  query = {'_id': cartBody._id},
    update = {
    $set: {status: cartBody.status},
    $push: {items: cartBody.items[0]}
  },
  options = {upsert: true, useFindAndModify: false};
  const cart = await Cart.findOneAndUpdate(query, update, options);
  return cart;
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
const getAllCart = async (filter, options) => {
  const result = await Cart.paginate(filter, options);
  return result;
};



/**
 * Get Cart by id
 * @param {ObjectId} id
 * @returns {Promise<Cart>}
 */
const getCart = async (id) => {
  return Cart.findById(id);
};


/**
 * Delete Cart by id
 * @param {ObjectId} CartId
 * @returns {Promise<Cart>}
 */
const deleteCart = async (CartId) => {
  const Cart = await getCart(CartId);
  if (!Cart) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Cart not found');
  }
  await Cart.remove();
  return Cart;
};


module.exports = {createCart, getAllCart, getCart, deleteCart}