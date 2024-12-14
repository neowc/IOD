const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// GET /api/products - Get all products
router.get('/', productController.getAllProducts);

// GET /api/products/:id - Get single product
router.get('/:id', productController.getProductById);

// POST /api/products - Create product
router.post('/', productController.createProduct);

// PUT /api/products/:id - Update product
router.put('/:id', productController.updateProduct);

// DELETE /api/products/:id - Delete product
router.delete('/:id', productController.deleteProduct);

// GET /api/products/category/:category - Get products by category
router.get('/category/:category', productController.getProductsByCategory);

// GET /api/products/search - Search products
router.get('/search', productController.searchProducts);

// POST /api/products/bulk - bulk insert endpoint
router.post('/bulk', productController.bulkCreateProducts);

module.exports = router;