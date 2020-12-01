const httpStatus = require('http-status');
const { Wishlist } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a wishlist
 * @param {Object} wishlistBody
 * @returns {Promise<wishlist>}
*/
const createWishlist = async (wishlistBody) => {
  let update;
  let query = { _id: wishlistBody.userId};
  let options = {upsert: true, useFindAndModify: false};

  await Wishlist.find({"items._id": wishlistBody.productsInfo._id }, async function (err, docs){
    console.log("Result:", docs);
    console.log("err:", err); 
    if (err){ 
      console.log(err) 
    } else{ 
      if(docs.length > 0) {
        update =  { $pull: { items: { _id: wishlistBody.productsInfo._id }} }
      } else{
        update = {
          $set: {_id: wishlistBody.userId, status: 'active'},
          $push: {items: wishlistBody.productsInfo} 
        }

    }

    console.log("Result:", docs); 

    const wishlist = await Wishlist.findOneAndUpdate(query, update, options);
    return wishlist;
    } 
  });
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
const getAllWishlist = async (filter, options) => {
  const result = await Wishlist.paginate(filter, options);
  return result;
};



/**
 * Get wishlist by id
 * @param {ObjectId} id
 * @returns {Promise<wishlist>}
 */
const getWishlist = async (id) => {
  return Wishlist.findById(id);
};


/**
 * Delete wishlist by id
 * @param {ObjectId} wishlistId
 * @returns {Promise<wishlist>}
 */
const deleteWishlist = async (wishlistId) => {
  const wishlist = await getWishlist(wishlistId);
  if (!wishlist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'wishlist not found');
  }
  await wishlist.remove();
  return wishlist;
};


module.exports = {createWishlist, getAllWishlist, getWishlist, deleteWishlist}