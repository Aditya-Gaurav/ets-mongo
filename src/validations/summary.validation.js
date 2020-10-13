const Joi = require('@hapi/joi');
const { password, objectId } = require('./custom.validation');

const createSummary = {
	body: Joi.object().keys({
		userId: Joi.string().custom(objectId),
		items: Joi.array().items(),
		shipping: Joi.object().keys(),
		payment: Joi.object().keys(),
		tracking:  Joi.object().keys()

	})    
};

const getAllSummary = {
 
};

const getSummary = {
  params: Joi.object().keys({
    summaryId: Joi.string().custom(objectId),
  }),
};

const updateSummary = {

};


const deleteSummary = {
  params: Joi.object().keys({
    summaryId: Joi.string().custom(objectId),
  }),
};

module.exports = {createSummary, getAllSummary, getSummary, updateSummary, deleteSummary}