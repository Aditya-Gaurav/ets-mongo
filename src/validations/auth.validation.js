const Joi = require('@hapi/joi');
const { password } = require('./custom.validation');

const register = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    // password: Joi.string().required().custom(password),
    password: Joi.string().required(),

    firstName: Joi.string(),
    lastName: Joi.string(),
    name: Joi.string(),
    username: Joi.string(),
    profileImage: Joi.string(),
    roles: Joi.array(),
    mobileNumber: Joi.string(),
    shippingAddress: Joi.array().items(
      Joi.object().keys({
        fullName: Joi.string(),
        address : Joi.string(),
        addressLine1: Joi.string(),
        addressLine2: Joi.string(),
        landmark: Joi.string(),
        city : Joi.string(),
        state :  Joi.string(),
        zip :  Joi.string(),
        phone :  Joi.string(),
        isPrimary: Joi.boolean()
      })
   ),

  }),
};

const login = {
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
};

const refreshTokens = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required(),
  }),
};

const forgotPassword = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
  }),
};

const resetPassword = {
  query: Joi.object().keys({
    token: Joi.string().required(),
  }),
  body: Joi.object().keys({
    password: Joi.string().required().custom(password),
  }),
};

module.exports = {
  register,
  login,
  refreshTokens,
  forgotPassword,
  resetPassword,
};
