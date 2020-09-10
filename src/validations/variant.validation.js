const Joi = require('@hapi/joi');
const { password, objectId } = require('./custom.validation');

const createVariant = {
	params: Joi.object().keys({
    itemId: Joi.string().custom(objectId)
	}),
	
	body: Joi.object().keys({
   
     name: Joi.string(),
		 lname: Joi.string(),
     itemId: Joi.string().custom(objectId),
     altIds: Joi.object().keys({
      upc: Joi.string()
     }),
     assets: Joi.object().keys({ 
      imgs: Joi.array().items(
         Joi.object().keys({ 
          height: Joi.string(),
          width: Joi.string(),
          src: Joi.string()
        })
     ),
     }),
    
     attrs: Joi.array().items(
      Joi.object().keys({
        name: Joi.string(),
				value: Joi.string(),
				family: Joi.string()
      })
     ),
  

	})  
};

const getVariants = {
  params: Joi.object().keys({
    itemId: Joi.string().custom(objectId)
	})
};

const getVariant = {
  params: Joi.object().keys({
    itemId: Joi.string().custom(objectId),
    variantId: Joi.string().custom(objectId),
  }),
};

const updateVariant = {
  params: Joi.object().keys({
    itemId: Joi.string().custom(objectId),
    variantId: Joi.string().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      email: Joi.string().email(),
      password: Joi.string().custom(password),
      name: Joi.string(),
    })
    .min(1),
};

const deleteVariant = {
  params: Joi.object().keys({
    itemId: Joi.string().custom(objectId),
    variantId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createVariant,
  getVariants,
  getVariant,
  updateVariant,
  deleteVariant,
};
