const Joi = require('@hapi/joi');
const { password, objectId } = require('./custom.validation');

const createHierarchy = {
    

  body: Joi.object().keys({
     name: Joi.string(),
     count: Joi.number(),
     parents: Joi.array(),
     facets: Joi.array(),
   })    
};

const getHierarchys = {
 
};

const getHierarchy = {
  params: Joi.object().keys({
    hierarchyId: Joi.string().custom(objectId),
  }),
};

const updateHierarchy = {

};


const deleteHierarchy = {
  params: Joi.object().keys({
    hierarchyId: Joi.string().custom(objectId),
  }),
};





module.exports = {createHierarchy, getHierarchys, getHierarchy, updateHierarchy, deleteHierarchy}