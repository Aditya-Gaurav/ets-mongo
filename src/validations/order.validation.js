const Joi = require('@hapi/joi');
const { password, objectId } = require('./custom.validation');

const createOrder = {
	body: Joi.object().keys({
		orderId: Joi.string().custom(objectId),
		vars: Joi.array().items(
						Joi.object().keys({
								variantId: Joi.string().custom(objectId),
								sku: Joi.string(),
								quantity: Joi.number()
						})
        ),
	})    
};

const getAllOrder = {
 
};

const getOrder = {
  params: Joi.object().keys({
    OrderId: Joi.string().custom(objectId),
  }),
};

const updateOrder = {

};


const deleteOrder = {
  params: Joi.object().keys({
    orderId: Joi.string().custom(objectId),
  }),
};

module.exports = {createOrder, getAllOrder, getOrder, updateOrder, deleteOrder}