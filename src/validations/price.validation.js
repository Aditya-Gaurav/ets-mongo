const Joi = require('@hapi/joi');
const { password, objectId } = require('./custom.validation');

const createPrice = {
	body: Joi.object().keys({
        _id: Joi.string(),
		price: Joi.number(),
        sale: Joi.object().keys({ 
            salePrice: Joi.number(),
            saleEndDate: Joi.date().iso(),
          })
	})    
};

const getPrices = {
    
};

const getPrice = {
  params: Joi.object().keys({
    priceId: Joi.string(),
  }),
};

const updatePrice = {
    params: Joi.object().keys({
        priceId: Joi.string(),
    }),
    body: Joi.object().keys({
		price: Joi.number(),
		sale: Joi.object(),
	})  
};


const deletePrice = {
  params: Joi.object().keys({
    priceId: Joi.string(),
  }),
};

module.exports = {createPrice, getPrices, getPrice, updatePrice, deletePrice}