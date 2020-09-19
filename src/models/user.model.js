const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { toJSON, paginate } = require('./plugins');
const { roles } = require('../config/roles');


const userShippingAddressSchema = mongoose.Schema(
  { 
    fullName: String,
    address : String,
    addressLine1: String,
    addressLine2: String,
    landmark: String,
    city : String,
    state :  String,
    zip :  String,
    phone :  String,
    isPrimary: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true,
  }

);

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    username: {
      type: String,
      unique: 'Username already exists',
      lowercase: true,
      trim: true,
      match: [ /^[a-z0-9\-]{3,32}$/ , 'Username can only include alphanumeric(lowercase) including - & must be 3-32 characters']
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Invalid email');
        }
      },
    },
    password: {
      type: String,
      trim: true,
      minlength: 4,
      validate(value) {
        if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
          throw new Error('Password must contain at least one letter and one number');
        }
      },
      private: true, // used by the toJSON plugin
    },
    roles: {
      type: [{
        type: String,
        enum: roles
      }],
      default: ['user'],
      required: 'Please provide at least one role'
    },
    profileImageURL: {
      type: String,
      default: 'modules/users/client/img/profile/default.png'
    },
    providerData: {},
    additionalProvidersData: {},
    mobileNumber: String,
    providerId: String,
    provider: String,
    shippingAddress: [userShippingAddressSchema]
  },
  {
    timestamps: true,
  },

);

// add plugin that converts mongoose to json
userSchema.plugin(toJSON);
userSchema.plugin(paginate);

/**
 * Check if email is taken
 * @param {string} email - The user's email
 * @param {ObjectId} [excludeUserId] - The id of the user to be excluded
 * @returns {Promise<boolean>}
 */
userSchema.statics.isEmailTaken = async function (email, excludeUserId) {
  const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
  return !!user;
};

/**
 * Check if providerId exists
 * @param {string} providerId - The user's oauth id
 * @param {ObjectId} [excludeUserId] - The id of the user to be excluded
 * @returns {Promise<boolean>} 
*/
userSchema.statics.isProviderIdExists = async function(providerId, excludeUserId) {
   const user = await this.findOne({ providerId, _id: {$ne: excludeUserId} })
   return !!user;
}

/**
 * Check if password matches the user's password
 * @param {string} password
 * @returns {Promise<boolean>}
 */
userSchema.methods.isPasswordMatch = async function (password) {
  const user = this;
  return bcrypt.compare(password, user.password);
};

userSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

/**
 * @typedef User
 */
const User = mongoose.model('User', userSchema);

module.exports = User;
