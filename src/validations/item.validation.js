const Joi = require('@hapi/joi');
const { password, objectId } = require('./custom.validation');

const createItem = {
    

  body: Joi.object().keys({
    desc: Joi.array().items(
       Joi.object().keys({
        lang: Joi.string(),
        val: Joi.string()
       })
    ),
     name: Joi.string(),
     lname: Joi.string(),
     category: Joi.string(),
     brand: Joi.object(),
     assets: Joi.object().keys({ 
      imgs: Joi.array().items(
        Joi.object().keys({
        img: Joi.object().keys({ 
          height: Joi.string(),
          width: Joi.string(),
          src: Joi.string()
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
        value: Joi.string()
      })
     ),
     variants:  Joi.object().keys({
      cnt: Joi.number(),
      attrs: Joi.array().items(
        Joi.object().keys({
          dispType: Joi.string(),
          name: Joi.string()
        })
      ) 
    })

	})    
};

const getItems = {
  query: Joi.object().keys({
    // name: Joi.string(),
    // role: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getItem = {
  params: Joi.object().keys({
    itemId: Joi.string().custom(objectId),
  }),
};

const updateItem = {

};


const deleteItem = {
  params: Joi.object().keys({
    itemId: Joi.string().custom(objectId),
  }),
};





module.exports = {createItem, getItems, getItem, updateItem, deleteItem}