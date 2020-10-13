const mongoose  = require('mongoose');

const InventorySchema = mongoose.Schema({
	itemId:  {
		type: mongoose.SchemaTypes.ObjectId,
		ref: 'Item',
	},
	vars: [{
	variantId: {
			type: mongoose.SchemaTypes.ObjectId,
			ref: 'Variant',
		},
		sku: String,
		quantity: Number
		
    }]
  },
  {
	timestamps: true
  }
)

const Inventory = mongoose.model('Inventory', InventorySchema);

module.exports = Inventory;
