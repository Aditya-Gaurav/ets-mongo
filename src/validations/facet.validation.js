const Joi = require('@hapi/joi');
const { password, objectId } = require('./custom.validation');

const createFacet = {
	body: Joi.object().keys({
		name: Joi.string(),
		value: Joi.string(),
		count: Joi.number()
	})    
};

const getFacets = {
 
};

const getFacet = {
  params: Joi.object().keys({
    facetId: Joi.string().custom(objectId),
  }),
};

const updateFacet = {

};


const deleteFacet = {
  params: Joi.object().keys({
    facetId: Joi.string().custom(objectId),
  }),
};

module.exports = {createFacet, getFacets, getFacet, updateFacet, deleteFacet}