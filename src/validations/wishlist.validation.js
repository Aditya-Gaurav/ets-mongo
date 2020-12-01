const Joi = require('@hapi/joi');
const { password, objectId } = require('./custom.validation');

const createWishlist = {
	body: Joi.object().keys({
		userId: Joi.string().custom(objectId),
		items: Joi.array().items(),
		shipping: Joi.object().keys(),
		payment: Joi.object().keys(),
		tracking:  Joi.object().keys()

	})    
};
const getAllWishlist = {
 
};

const getWishlist = {
  params: Joi.object().keys({
    WishlistId: Joi.string().custom(objectId),
  }),
};

const updateWishlist = {

};


const deleteWishlist = {
  params: Joi.object().keys({
    WishlistId: Joi.string().custom(objectId),
  }),
};

module.exports = {createWishlist, getAllWishlist, getWishlist, updateWishlist, deleteWishlist}