const mongoose = require('mongoose');
const HierarchyModel = mongoose.Schema({
  	name: {
        type: String
    },
    count: {
        type: Number
    },
    parents: {
        type: []

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