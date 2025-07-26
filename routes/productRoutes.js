import express from 'express';
import Product from '../models/Product.js';
import { isAuthenticated, isAdmin } from '../middleware/auth.js';
import { getAllProducts } from '../controllers/productController.js';

const router = express.Router();

router.get('/public', getAllProducts)
// Apply authentication and admin middleware to all routes
router.use(isAuthenticated);
router.use(isAdmin);

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get a single product
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create a product
router.post('/', async (req, res) => {
  try {
    const { title, description, price, imageUrl, stock } = req.body;
    const newProduct = new Product({
      title,
      description,
      price,
      imageUrl,
      stock: stock || 0,
    });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update a product
router.put('/:id', async (req, res) => {
  try {
    const { title, description, price, imageUrl, stock } = req.body;
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        price,
        imageUrl,
        stock,
      },
      { new: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(updatedProduct);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete a product
router.delete('/:id', async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
