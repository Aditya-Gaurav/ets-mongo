const mongoose = require('mongoose');
const PriceModel = mongoose.Schema({
	  _id: String,
		price: {
        type: String
    },
    sales: {
			salePrice: Number,
			saleEndDate: Date,
    },
  },
	{
		timestamps: true
	}
)

const Price  = mongoose.model('Price', PriceModel);

module.exports = Price;



// {
//     "_id": "SPM8824542513_1234",
//         "price": "69.99",
//         "sale": {
//             "salePrice": "42.72",
//             "saleEndDate": "2050-12-31 23:59:59"
//         },
//     "lastUpdated": 1374647707394
// }