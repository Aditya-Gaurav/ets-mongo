const mongoose = require('mongoose');

const CartSchema = mongoose.Schema({
		_id: String,
		status: String,
		items: [
			{
				sku: String,
				quantity: Number,
				itemDetails: Object
			}
		]
	},
	{
		timestamps: true
  }
)

const Cart = mongoose.model('Cart', CartSchema);

module.exports = Cart