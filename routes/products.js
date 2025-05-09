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

//------------------------- getting categories ----------------
router.get('/', async (req, res) => {
    try {
        const { na } = req.query;
        let search = {};
        if (na) {
            search.$or = [
                { name: { $regex: `^${na}`, $options: 'i' } }
            ];
        }
        const pro = await Products.find(search);
        res.json({ action: 'success', count: pro.length, data: pro });
    } catch (err) {
        res.status(500).json({ message: 'Product not found', error: err.message });
    }
});


router.get('/desktop', async (req, res) => {
    try {
        const { price } = req.query
        let search = {}
        search.$or = [
            { category: 'desktop' }
        ]
        const pro = await Products.find(search)
        res.json({ action: 'success', count: pro.length, data: pro })
    } catch (err) {
        res.json({ message: 'product not found' })
    }
})

router.get('/laptop', async (req, res) => {
    try {
        const { price } = req.query
        let search = {}
        search.$or = [
            { category: 'laptop' }
        ]
        const pro = await Products.find(search)
        res.json({ action: 'success', count: pro.length, data: pro })
    } catch (err) {
        res.json({ message: 'product not found' })
    }
})

router.get('/monitor', async (req, res) => {
    try {
        const { price } = req.query
        let search = {}
        search.$or = [
            { category: 'monitor' }
        ]
        const pro = await Products.find(search)
        res.json({ action: 'success', count: pro.length, data: pro })
    } catch (err) {
        res.json({ message: 'product not found' })
    }
})

router.get('/tv', async (req, res) => {
    try {
        const { price } = req.query
        let search = {}
        search.$or = [
            { category: 'tv' }
        ]
        const pro = await Products.find(search)
        res.json({ action: 'success', count: pro.length, data: pro })
    } catch (err) {
        res.json({ message: 'product not found' })
    }
})

router.get('/gaming', async (req, res) => {
    try {
        const { price } = req.query
        let search = {}
        search.$or = [
            { category: 'gaming' }
        ]
        const pro = await Products.find(search)
        res.json({ action: 'success', count: pro.length, data: pro })
    } catch (err) {
        res.json({ message: 'product not found' })
    }
})

router.get('/accessories', async (req, res) => {
    try {
        const { price } = req.query
        let search = {}
        search.$or = [
            { category: 'accessories' }
        ]
        const pro = await Products.find(search)
        res.json({ action: 'success', count: pro.length, data: pro })
    } catch (err) {
        res.json({ message: 'product not found' })
    }
})

router.get('/bluetooth-speaker', async (req, res) => {
    try {
        const { price } = req.query
        let search = {}
        search.$or = [
            { category: 'bluetooth-speaker' }
        ]
        const pro = await Products.find(search)
        res.json({ action: 'success', count: pro.length, data: pro })
    } catch (err) {
        res.json({ message: 'product not found' })
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