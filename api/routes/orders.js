const express = require('express');
const router = express.Router();


router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'handling GET request to /orders'
    })
});

router.post('/', (req, res, next) => {
    res.status(200).json({
        message: 'handling POST request to /orders'
    })
});

router.get('/:orderId', (req, res, next) => {
    const id = req.params.productId;
});

router.put('/:orderId', (req, res, next) => {
    const id = req.params.productId;
});


router.delete('/:orderId', (req, res, next) => {
    const id = req.params.productId;
});
module.exports = router;