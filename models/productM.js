const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    discount: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        default: 0
    },
    brand: {
        type: String,
        required: true
    },
    availability: {
        type: Boolean,
        default: true
    },
    dailySale: {
        type: Boolean,
        default: false
    },
    monthSale: {
        type: Boolean,
        default: false
    }
});
const Products = mongoose.model('products', productSchema);
module.exports = Products;
