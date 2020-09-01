const mongoose = require('mongoose');
const VariantModel = mongoose.Schema(
  {
		name: String,
		lname:{
			type: String,

		},
		itemId: {
		  type: mongoose.Schema.ObjectId,
			ref: 'Product'
		},
		altIds: {
			type: String
		},
		assets:{
			imgs: {
				type: [],
				default: undefined
			}
		},
		attrs: {
			type: [],
			default: undefined
		}

	});

const Variant = mongoose.model('Variant', VariantModel);

module.exports = Variant;


// {
// 	"_id": "05458452563",
// 	"name": "Width:Medium,Color:Ivory,Shoe Size:6.5",
// 	"lname": "width:medium,color:ivory,shoe size:6.5",
// 	"itemId": "054VA72303012P",
// 	"altIds": {
// 			"upc": "632576103580"
// 	},
// 	"assets": {
// 			"imgs": [
// 					{
// 							"width": "1900",
// 							"height": "1900",
// 							"src": "http://c.shld.net/rpx/i/s/i/spin/image/spin_prod_945348512"
// 					},
// 					{
// 							"width": "1900",
// 							"height": "1900",
// 							"src": "http://c.shld.net/rpx/i/s/i/spin/image/spin_prod_945348612"
// 					}
// 			]
// 	},
// 	"attrs": [
// 			{
// 					"name": "Width",
// 					"value": "Medium"
// 			},
// 			{
// 					"name": "Color",
// 					"family": "White",
// 					"value": "Ivory"
// 			},
// 			{
// 					"name": "6.5",
// 					"value": "6.5"
// 			}
// 	]
// }

