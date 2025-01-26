

const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Get all products
router.get('/', productController.getAllProducts.bind(productController));

// Get a single product
router.get('/:id', productController.getProductById.bind(productController));

// Create a new product
router.post('/', productController.createProduct.bind(productController));

// Update a product
router.put('/:id', productController.updateProduct.bind(productController));

// Delete a product
router.delete('/:id', productController.deleteProduct.bind(productController));

// Get products by category
router.get('/category/:category', productController.getProductsByCategory.bind(productController));

// Get all categories
router.get('/categories/all', productController.getAllCategories.bind(productController));

module.exports = router;