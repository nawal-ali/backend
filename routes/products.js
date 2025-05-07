const express = require('express');
const router = express.Router();
const Products = require('../models/productM.js');

//get all products
router.get('/all', async (req, res) => {
    try {
        const allProducts = await Products.find()
        res.json({ action: 'success', count: allProducts.length, data: allProducts })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

//get one product
router.get('/:id', async (req, res) => {
    const product = await Products.findById(req.params.id)
    if (product) {
        res.json({ action: 'success', data: product })
    } else {
        res.status(404).json({ message: 'Product not found' })
    }
    // if (!product) return res.status(404).json({ message: 'Product not found' })
})

//create a product
router.post('/add', async (req, res) => {
    const product = new Products({
        // id: req.body.id,
        // id: Math.floor(Math.random() * 1000), // generate a random id
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        discount: req.body.discount,
        category: req.body.category,
        imageUrl: req.body.imageUrl,
        rating: req.body.rating,
        brand: req.body.brand,
        availability: req.body.availability,
        dailySale: req.body.dailySale,
        monthSale: req.body.monthSale
    })
    try {
        const newProduct = await product.save()
        res.status(201).json(newProduct)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

//update a product
router.patch('/:id', async (req, res) => {
    try {
        const product = await Products.findById(req.params.id); // ✅ use param and await

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Update only fields that are provided
        if (req.body.name !== undefined) product.name = req.body.name;
        if (req.body.price !== undefined) product.price = req.body.price;
        if (req.body.description !== undefined) product.description = req.body.description;
        if (req.body.discount !== undefined) product.discount = req.body.discount;
        if (req.body.category !== undefined) product.category = req.body.category;
        if (req.body.imageUrl !== undefined) product.imageUrl = req.body.imageUrl;
        if (req.body.rating !== undefined) product.rating = req.body.rating;
        if (req.body.brand !== undefined) product.brand = req.body.brand;
        if (req.body.availability !== undefined) product.availability = req.body.availability;
        if (req.body.dailySale !== undefined) product.dailySale = req.body.dailySale;
        if (req.body.monthSale !== undefined) product.monthSale = req.body.monthSale;

        const updatedProduct = await product.save();
        res.json(updatedProduct);

    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


//delete a product
router.delete('/:id', (req, res) => {
    Products.findByIdAndDelete(req.params.id)
        .then(() => res.json({ message: 'Product deleted' }))
        .catch(err => res.status(500).json({ message: err.message }))

})
module.exports = router;