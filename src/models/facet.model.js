const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');


const FacetSchema = mongoose.Schema({
    _id: String,
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

FacetSchema.plugin(toJSON);
FacetSchema.plugin(paginate);

const Facet = mongoose.model('Facet', FacetSchema);

module.exports = Facet;


// {
//     "_id": "accessory type=hosiery",
//     "name": "Accessory Type",
//     "value": "Hosiery",
//     "count": 14
// }