const Joi = require('@hapi/joi');
const { password, objectId } = require('./custom.validation');

const createCart = {
	body: Joi.object().keys({
		cartId: Joi.string().custom(objectId),
		vars: Joi.array().items(
						Joi.object().keys({
								variantId: Joi.string().custom(objectId),
								sku: Joi.string(),
								quantity: Joi.number()
						})
        ),
	})    
};

const getAllCart = {
 
};

const getCart = {
  params: Joi.object().keys({
    cartId: Joi.string().custom(objectId),
  }),
};

const updateCart = {

};


const deleteCart = {
  params: Joi.object().keys({
    cartId: Joi.string().custom(objectId),
  }),
};

module.exports = {createCart, getAllCart, getCart, updateCart, deleteCart}