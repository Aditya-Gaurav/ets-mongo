const mongoose = require('mongoose');

const CartSchema = mongoose.Schema({
		_id: String,
		status: String,
		items: [
			{
				// sku: String,
				// quantity: Number,
				// itemDetails: Object
			}
		]
	},
	{
		timestamps: true
  }
)

const Cart = mongoose.model('Cart', CartSchema);

module.exports = Cart


// {
// 	_id: userId,
// 	last_modified: ISODate("2012-03-09T20:55:36Z"),
// 	status: 'active',
// 	items: [
// 			{ sku: '00e8da9b', qty: 1, 	item_details: { _id: variantId, quantity: quantity, name: "Simsong Mobile", price: 1000},
// 			{ sku: '0ab42f88', qty: 4, item_details: {...} }
// 	]
// }