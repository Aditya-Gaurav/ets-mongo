const mongoose = require('mongoose');
const whishlistSchema = mongoose.Schema({
		_id:String,
		userId: {
			type: mongoose.SchemaTypes.ObjectId,
			ref: 'User'
		},
		items: [
			{
					sku:String,
					status:Number,

			}
		]
	}
)

const Wishlist = mongoose.model('Wishlist', whishlistSchema);

module.exports = Wishlist;
