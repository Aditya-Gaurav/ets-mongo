const mongoose = require('mongoose');
const categoryModel = mongoose.Schema({
    _id: String,
    parent: String,
    name: String,
    order: Number,
    count: Number,
    url: String,
    facets: Array
})

const Category = mongoose.model('Category', categoryModel);

module.exports = Category;