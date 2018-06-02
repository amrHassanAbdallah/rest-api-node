const express = require('express');
const router = express.Router();


router.get('/',(req,res,next)=>{
    res.status(200).json({
        message : 'handling GET request to /products'
    })
});

router.post('/',(req,res,next)=>{
    res.status(200).json({
        message : 'handling POST request to /products'
    })
});

router.get('/:productId',(req,res,next)=>{
    const id = req.params.productId ;
});

router.put('/:productId', (req, res, next) => {
    const id = req.params.productId;
});


router.delete('/:productId', (req, res, next) => {
    const id = req.params.productId;
});
module.exports = router;