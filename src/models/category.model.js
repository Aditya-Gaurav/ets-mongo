const mongoose = require('mongoose');
const categoryModel = mongoose.Schema({
    _id: String,
    parent: String,
    order: Number,
    count: Number,
    slug: String,
    facets: Array
})

const Category = mongoose.model('Category', categoryModel);

module.exports = Category;