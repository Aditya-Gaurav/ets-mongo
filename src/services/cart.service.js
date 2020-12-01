const httpStatus = require('http-status');
const { Cart } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a Cart
 * @param {Object} CartBody
 * @returns {Promise<Cart>}
*/
const createCart = async (cartBody) => {
  let update;
  let query = { _id: cartBody.userId};
  let options = {upsert: true, useFindAndModify: false};

  await Cart.find({"items._id": cartBody.productsInfo._id }, async function (err, docs){
    console.log("Result:", docs);
    console.log("err:", err); 
 

    if (err){ 
      console.log(err) 
    } 


    else{ 
      if(docs.length > 0) {
        update =  { $pull: { items: { _id: cartBody.productsInfo._id  }} }
      } else{
        update = {
          $set: {_id: cartBody.userId, status: 'active'},
          $push: {items: cartBody.productsInfo} 
        }

      }

      console.log("Result:", docs); 

      const cart = await Cart.findOneAndUpdate(query, update, options);
      return cart;
  } 
  });
  
  // if(req.body.addCart){
  //   update = { $push: {items: cartBody.productsInfo} }
  // } else{
  //   update =  { $pull: { items: { _id: cartBody.productsInfo._id  }} }
  // }
  // console.log("CartBody", cartBody);

  // return;
  // query = {'_id': cartBody._id},
  //   update = {
  //   $set: {status: cartBody.status},
  //   $push: {items: cartBody.items[0]}
  // },
  // const cart = await Cart.findOneAndUpdate(query, update, options);
  // return cart;

// console.log("userId:", cartBody.userId);
// console.log("productsInfo:", cartBody.productsInfo)


//   const cart = Cart.findOneAndUpdate(
//     { _id: cartBody.userId}, 
//     //  {$set: {"items.status": "inActive"}},

//     {
//      $push: {items: cartBody.productsInfo }
//     //  $pull: { items: { _id: cartBody.productsInfo._id  }}

//      },
    
//     options);


//   return cart;



  // var quantity = 1;
  // var col = db.getSisterDB("shop").products;
  // col.update({
  //     _id: productId
  //   , quantity: { $gte: quantity }
  // }, {
  //     $inc: { quantity: -quantity }
  //   , $push: {
  //     reserved: {
  //       quantity: quantity, _id: userId, created_on: new Date()
  //     }
  //   }
  // });


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