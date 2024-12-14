const Product = require('../models/product'); // why got casing error '../models/product'?

// Get all products
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({ isActive: true });
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get single product
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Create product
exports.createProduct = async (req, res) => {
    try {
        const product = new Product(req.body);
        await product.save();
        res.status(201).json(product);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Update product
exports.updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete product
exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get products by category
exports.getProductsByCategory = async (req, res) => {
    try {
        const products = await Product.find({
            category: req.params.category,
            isActive: true
        });
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Search products
exports.searchProducts = async (req, res) => {
    try {
        const { query } = req.query;
        const products = await Product.find({
            $text: { $search: query },
            isActive: true
        });
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// bulk insert endpoint
exports.bulkCreateProducts = async (req, res) => {
    try {
        const products = req.body.products;
        if (!Array.isArray(products)) {
            return res.status(400).json({ error: 'Products must be an array' });
        }

        const insertedProducts = await Product.insertMany(products);
        res.status(201).json({
            message: `Successfully inserted ${insertedProducts.length} products`,
            products: insertedProducts
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

