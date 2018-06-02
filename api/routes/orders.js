const express = require('express');
const router = express.Router();


const orderController = require('../controllers/orderController')

router.get('/',orderController.order_get_all);

router.post('/', orderController.orders_create);

router.get('/:orderId', orderController.orders_get_one);

router.put('/:orderId', orderController.orders_update);

router.delete('/:orderId',orderController.order_delete);

module.exports = router;