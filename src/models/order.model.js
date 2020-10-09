const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const OrderSchema = mongoose.Schema({
	  userId: {
			type: mongoose.SchemaTypes.ObjectId,
			ref: 'User'
		},
		items: [{
		 sku: String, 
		 name: String, 
		 quantity: Number, 
		 price:Number
		}],

		shipping: {
			name: String,
			address: String,
			city: String,
			state: String,
			country: String,
			zipCode: String,
			region: String,
			deliveryNotes: String
		},

		tracking: {
			company: String,
			trackingNumber: String,
			status: String,
			estimatedDelivery: Date
		},

		payment: {
			method: String,
			transactionId: String
		}
	},
	{
		timestamps: true
	}
)


OrderSchema.plugin(toJSON);
OrderSchema.plugin(paginate);

const Order = mongoose.model('Order', OrderSchema);
module.exports = Order;

// db.orders.insert({
//    created_on: new ISODate("2012-05-17T08:14:15.656Z"),

//    shipping: {
//      customer: "Peter P Peterson",
//      address: "Longroad 1343",
//      city: "Peterburg",
//      region: "",
//      state: "PE",
//      country: "Peteonia",
//      delivery_notes: "Leave at the gate",

//      tracking: {
//        company: "ups",
//        tracking_number: "22122X211SD",
//        status: "ontruck",
//        estimated_delivery: new ISODate("2012-05-17T08:14:15.656Z")
//      },
//    },

//    payment: {
//      method: "visa",
//      transaction_id: "2312213312XXXTD"
//    }

//    products: {
//      {quantity: 2, sku:"111445GB3", title: "Simsong mobile phone", unit_cost:1000, currency:"USDA"}
//    }
//  })