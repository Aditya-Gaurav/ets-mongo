const mongoose = require('mongoose');

const FacetModel = mongoose.Schema({
    name: {
        type: String
    },
    value: {
        type: String
    },
    count: {
        type: String
    }
	},
	{
		timestamps: true
	}
)

const Facet = mongoose.model('Facet', FacetModel);

module.exports = Facet;


// {
//     "_id": "accessory type=hosiery",
//     "name": "Accessory Type",
//     "value": "Hosiery",
//     "count": 14
// }