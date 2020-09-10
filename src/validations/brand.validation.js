const Joi = require('@hapi/joi');
const { password, objectId } = require('./custom.validation');

const createBrand = {
	body: Joi.object().keys({
		name: Joi.string(),
		img: Joi.string()
	})    
};

const getBrands = {
 
};

const getBrand = {
  params: Joi.object().keys({
    brandId: Joi.string().custom(objectId),
  }),
};

const updateBrand = {

};


const deleteBrand = {
  params: Joi.object().keys({
    brandId: Joi.string().custom(objectId),
  }),
};

module.exports = {createBrand, getBrands, getBrand, updateBrand, deleteBrand}