const mongoose = require('mongoose');

const ProductMediaSchema = mongoose.Schema(
	{
		media_orientation: String,
		media_small_url: String,
		media_medium_url: String,
		media_original_url: String,
		media_video_small_url: String,
		media_video_medium_url: String,
		media_video_original_url: String,
		video_duration: Number,
		media_orientation:String,
		mediaType: String,
		media_original_height: Number,
		media_original_width: Number,
		is_published: Number
	}
)

const ProductModelSchema = mongoose.Schema({
	desc: [{
		lang: String,
		val: String
	}],
	name: String,
	vname: {
		type: String,
		lowercase: true
	},
	category: {
			type: String
	},
	brand: {
		type: mongoose.Types.ObjectId,
		ref: 'brand'
	},
	assets: {
		imgs: {
			type: Array,
		}
	},
	shipping: {
		dimensions: {
			type: Object
		},
		weight: {
			type: String
		}
	},
	specs: {
		type: Array
	},
	attrs: {
		type: Array
	},
	variants: {
		cnt: Number,
		attrs: Array
	},


	// title: String,
	// sku: String,
	// price: {
	// 	type: Currency,
	// 	required: true
  // },
  // product_price_double: {
	// 	type: Number,
	// 	required: false
  // },
  // cost: {
	// 	type: Currency,
	// 	required: false
	// },

	// media: [ProductMediaSchema],
	// attributes: {},
	// manufacture_details: {},
	// shipping_details: {
	// 	weight: Number,
	// 	width: Number,
	// 	height: Number,
	// 	depth: Number
	// },
	// sku: [{
	// 	sku: String,
	// 	color: String,
	// 	price: String,
	// 	quantity: Number,
	// 	stockQuantity:Number,
	// 	size: String,
	// 	quantityOnOrder: Number,
	// }],
	// categories:[{}]
	},
	{
		timestamps: true
	}
);

const Item  =  mongoose.model('Item', ProductModelSchema)

module.exports = Item;





// {
//     "_id": "054VA72303012P",
//     "desc": [
//         {
//             "lang": "en",
//             "val": "Give your dressy look a lift with these women's Kate high-heel shoes by Metaphor. These playful peep-toe pumps feature satin-wrapped stiletto heels and chiffon pompoms at the toes. Rhinestones on each of the silvertone buckles add just a touch of sparkle to these shoes for a flirty footwear look that's made for your next night out."
//         }
//     ],
//     "name": "Women's Kate Ivory Peep-Toe Stiletto Heel",
//     "lname": "women's kate ivory peep-toe stiletto heel",
//     "category": "/84700/80009/1282094266/1200003270",
//     "brand": {
//         "id": "2483510",
//         "img": {
//             "src": "http://i.sears.com/s/i/bl/image/spin_prod_metadata_168138610"
//         },
//         "name": "Metaphor"
//     },
//     "assets": {
//         "imgs": [
//             {
//                 "img": {
//                     "height": "1900",
//                     "src": "http://c.shld.net/rpx/i/s/i/spin/image/spin_prod_967112812",
//                     "width": "1900"
//                 }
//             },
//             {
//                 "img": {
//                     "height": "1900",
//                     "src": "http://c.shld.net/rpx/i/s/i/spin/image/spin_prod_945877912",
//                     "width": "1900"
//                 }
//             },
//             {
//                 "img": {
//                     "height": "1900",
//                     "src": "http://c.shld.net/rpx/i/s/i/spin/image/spin_prod_945878012",
//                     "width": "1900"
//                 }
//             }
//         ]
//     },
//     "shipping": {
//         "dimensions": {
//             "height": "13.0",
//             "length": "1.8",
//             "width": "26.8"
//         },
//         "weight": "1.75"
//     },
//     "specs": [
//         {
//             "name": "Heel Height (in.)",
//             "val": "3.75"
//         }
//     ],
//     "attrs": [
//         {
//             "name": "Heel Height",
//             "value": "High (2-1/2 to 4 in.)"
//         },
//         {
//             "name": "Upper Material",
//             "value": "Synthetic"
//         },
//         {
//             "name": "Toe",
//             "value": "Open toe"
//         }
//         {
//             "name": "Brand",
//             "value": "Metaphor"
//         }
//     ],
//     "variants": {
//         "cnt": 9,
//         "attrs": [
//             {
//                 "dispType": "COMBOBOX",
//                 "name": "Width",
//             },
//             {
//                 "dispType": "DROPDOWN",
//                 "name": "Color",
//             },
//             {
//                 "dispType": "DROPDOWN",
//                 "name": "Shoe Size",
//             }
//         ]
//     },
//     "lastUpdated": 1400877254787
// }