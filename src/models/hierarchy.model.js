const mongoose = require('mongoose');
const HierarchyModel = mongoose.Schema({
    _id: String,
  	name: {
      type: String
    },
    count: {
      type: Number
    },
    parents: {
			type: [{
				type: mongoose.SchemaTypes.ObjectId,
				ref: 'Hierarchy'
			}],
    },
    category: {
      type: String
    },
    facets: {
      type: []
    }
	},
	{
		timestamps: true
	}
)


const Hierarchy = mongoose.model('Hierarchy', HierarchyModel);

module.exports = Hierarchy;



// {
//     "_id": "1200003270",
//     "name": "Women's Heels & Pumps",
//     "count": 223,
//     "parents": [
//         "1282094266"
//     ],
//     "facets": [
//         "Heel Height",
//         "Toe",
//         "Upper Material",
//         "Width",
//         "Shoe Size",
//         "Color"
//     ]
// }