const mongoose = require('mongoose');

const brandModelSchema = mongoose.Schema({
    img: {
        type: Object
    },
    name: {
        type: String
    }
})