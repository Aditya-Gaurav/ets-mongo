const Joi = require('@hapi/joi');
const { password, objectId } = require('./custom.validation');

const createOrder = {
	body: Joi.object().keys({
		userId: Joi.string().custom(objectId),
		items: Joi.array().items(),
		shipping: Joi.object().keys(),
		payment: Joi.object().keys(),
		tracking:  Joi.object().keys()

	})    
};
async
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