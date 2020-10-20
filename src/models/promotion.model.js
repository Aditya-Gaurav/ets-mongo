const mongoose = require('mongoose');

const PromotionSchema = mongoose.Schema({
    displayName: String,
    value: String,
    isActive: Boolean
})

const Promotion = mongoose.model('Promotion', PromotionSchema);

module.exports = Promotion;
