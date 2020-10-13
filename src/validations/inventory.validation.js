const Joi = require('@hapi/joi');
const { password, objectId } = require('./custom.validation');

const createInventory = {
	body: Joi.object().keys({
		itemId: Joi.string().custom(objectId),
		vars: Joi.array().items(
			Joi.object().keys({
				variantId: Joi.string().custom(objectId),
				sku: Joi.string(),
				quantity: Joi.number()
			})
        ),
	})    
};

const getAllInventory = {
 
};

const getInventory = {
  params: Joi.object().keys({
    inventoryId: Joi.string().custom(objectId),
  }),
};

const updateInventory = {

};


const deleteInventory = {
  params: Joi.object().keys({
    facetId: Joi.string().custom(objectId),
  }),
};

module.exports = {createInventory, getAllInventory, getInventory, updateInventory, deleteInventory}