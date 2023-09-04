const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const productController = require('../controllers/productController');
const orderController = require('../controllers/orderController');

// Routes untuk produk
router.get('/products', productController.getAllProducts);
router.get('/products/:productId', productController.getProductById);
router.post('/products', authMiddleware, productController.createProduct);
router.put('/products/:productId', authMiddleware, productController.updateProductById);
router.delete('/products/:productId', authMiddleware, productController.deleteProductById);

// Routes untuk pesanan (order)
router.post('/orders', authMiddleware, orderController.createOrder);
router.get('/orders', authMiddleware, orderController.getAllOrders);
router.get('/orders/:orderId', authMiddleware, orderController.getOrderById);
router.put('/orders/:orderId', authMiddleware, orderController.updateOrderStatus);
router.delete('/orders/:orderId', authMiddleware, orderController.deleteOrderById);

module.exports = router;
