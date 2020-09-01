const Joi = require('@hapi/joi');
const { password, objectId } = require('./custom.validation');

const createItem = {
    

  body: Joi.object().keys({
    desc: Joi.array().items(
       Joi.object().keys({
        lang: Joi.string(),
        en: Joi.string()
       })
    ),
     name: Joi.string(),
     lname: Joi.string(),
     category: Joi.string(),
     brand: Joi.string(),
     assets: Joi.object().keys({ 
      imgs: Joi.array().items(
        Joi.object().keys({
        img: Joi.object().keys({ 
          lang: Joi.string(),
          en: Joi.string()
        })
      })
     ),
     }),
     shipping: Joi.object().keys({
      dimensions: Joi.object().keys({
        height: Joi.string(),
        width: Joi.string(),
        length: Joi.string()
      }),
      weight: Joi.string()
     }),
     specs: Joi.array().items(
      Joi.object().keys({
        name: Joi.string(),
        val: Joi.string()
      })
     ),
     attrs: Joi.array().items(
      Joi.object().keys({
        name: Joi.string(),
        val: Joi.string()
      })
     ),
     variants:  Joi.object().keys({
      cnt: Joi.number(),
      attrs: Joi.array().items(
        Joi.object().keys({
          name: Joi.string(),
          val: Joi.string()
        })
      ) 
    })

	})    
};

const getItems = {
     
};

const updateItem = {

};
const deleteItem = {

};
module.exports = {createItem, getItems, updateItem, deleteItem}