const mongoose = require('mongoose');
const whishlistSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	status: String,
	userId:  {
		type: mongoose.SchemaTypes.ObjectId,
		ref: 'User',
	},
	items: [
		{
			_id: {
				type: mongoose.SchemaTypes.ObjectId,
				ref: 'Variant',
			},
			
			name: String

		}
	]
	},
	{
		timestamps: true
	}
)

const Wishlist = mongoose.model('Wishlist', whishlistSchema);

module.exports = Wishlist;



