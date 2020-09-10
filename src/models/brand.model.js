const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const brandModelSchema = mongoose.Schema({
	name: {
		type: String
	},
	img: {
		type: Object
	}
})

brandModelSchema.plugin(toJSON);
brandModelSchema.plugin(paginate);

const Brand = mongoose.model('Brand', brandModelSchema);

module.exports = Brand;