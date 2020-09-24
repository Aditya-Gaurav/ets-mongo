const mongoose = require('mongoose');
const categoryModel = mongoose.Schema({
    _id: String,
    parent: String,
    order: Number
})

const Category = mongoose.model('Category', categoryModel);

module.exports = Category;