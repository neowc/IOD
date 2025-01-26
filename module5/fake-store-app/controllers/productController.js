const axios = require('axios');

class ProductController {
    constructor() {
        this.baseURL = 'https://fakestoreapi.com/products';
    }

    // Get all products
    async getAllProducts(req, res) {
        try {
            const response = await axios.get(this.baseURL);
            res.status(200).json(response.data);
        } catch (error) {
            res.status(500).json({
                message: 'Error fetching products',
                error: error.message
            });
        }
    }

    // Get a single product by ID
    async getProductById(req, res) {
        try {
            const { id } = req.params;
            const response = await axios.get(`${this.baseURL}/${id}`);
            if (!response.data) {
                return res.status(404).json({ message: 'Product not found' });
            }

            res.status(200).json(response.data);
        } catch (error) {
            res.status(500).json({
                message: 'Error fetching product',
                error: error.message
            });
        }
    }

    // Create a new product
    async createProduct(req, res) {
        try {
            const productData = {
                title: req.body.title,
                price: req.body.price,
                description: req.body.description,
                image: req.body.image,
                category: req.body.category
            };

            const response = await axios.post(this.baseURL, productData);
            res.status(201).json(response.data);
        } catch (error) {
            res.status(500).json({
                message: 'Error creating product',
                error: error.message
            });
        }
    }

    // Update a product
    async updateProduct(req, res) {
        try {
            const { id } = req.params;
            const productData = {
                title: req.body.title,
                price: req.body.price,
                description: req.body.description,
                image: req.body.image,
                category: req.body.category
            };

            const response = await axios.put(`${this.baseURL}/${id}`, productData);
            res.status(200).json(response.data);
        } catch (error) {
            res.status(500).json({
                message: 'Error updating product',
                error: error.message
            });
        }
    }

    // Delete a product
    async deleteProduct(req, res) {
        try {
            const { id } = req.params;
            const response = await axios.delete(`${this.baseURL}/${id}`);
            res.status(200).json({
                message: 'Product deleted successfully',
                data: response.data
            });
        } catch (error) {
            res.status(500).json({
                message: 'Error deleting product',
                error: error.message
            });
        }
    }

    // Get products in a specific category
    async getProductsByCategory(req, res) {
        try {
            const { category } = req.params;
            const response = await axios.get(`${this.baseURL}/category/${category}`);
            res.status(200).json(response.data);
        } catch (error) {
            res.status(500).json({
                message: 'Error fetching products by category',
                error: error.message
            });
        }
    }

    // Get all product categories
    async getAllCategories(req, res) {
        try {
            const response = await axios.get(`${this.baseURL}/categories`);
            res.status(200).json(response.data);
        } catch (error) {
            res.status(500).json({
                message: 'Error fetching categories',
                error: error.message
            });
        }
    }
}

module.exports = new ProductController();