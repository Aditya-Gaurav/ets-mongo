const httpStatus = require('http-status');
const { Order } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a Order
 * @param {Object} OrderBody
 * @returns {Promise<Order>}
*/
const createOrder = async (orderBody) => {
  console.log("OrderBody", orderBody)
  const order = await Order.create(orderBody);
  return order;
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
const getAllOrder = async (filter, options) => {
  const result = await Order.paginate(filter, options);
  return result;
};



/**
 * Get Order by id
 * @param {ObjectId} id
 * @returns {Promise<Order>}
 */
const getOrder = async (id) => {
  return Order.findById(id);
};


/**
 * Delete Order by id
 * @param {ObjectId} OrderId
 * @returns {Promise<Order>}
 */
const deleteOrder = async (OrderId) => {
  const order = await getOrder(OrderId);
  if (!order) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Order not found');
  }
  await Order.remove();
  return order;
};


module.exports = {createOrder, getAllOrder, getOrder, deleteOrder}