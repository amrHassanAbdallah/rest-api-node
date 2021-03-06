const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads');
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString() + file.originalname)
    }
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(new Error('message'), false);
    }
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

const Prodcut = require('../models/product');

router.get('/', (req, res, next) => {
    Prodcut.find()
        .select('name price _id productImage')
        .exec()
        .then(docs => {
            res.status(200).json({
                count: docs.length,
                products: docs.map(doc => {
                    return {
                        name: doc.name,
                        price: doc.price,
                        _id: doc._id,
                        productImage: doc.productImage,
                        links: {
                            self: "localhost:3000/products/" + doc._id
                        }
                    }
                })
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });

});

router.post('/', upload.single('productImage'), (req, res, next) => {
    const product = new Prodcut({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: parseFloat(req.body.price),
        productImage:req.file.path

    });

    product.save()
        .then(result => {
            console.log(result);
            res
              .status(200)
              .json({
                message: "handling POST request to /products",
                product: {
                  name: result.name,
                  price: result.price,
                  productImage:result.productImage,
                  _id: result._id
                }
              });
        }).catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });

});

router.get('/:productId', (req, res, next) => {
    const id = req.params.productId;
    let product = Prodcut.findById(id)
        .select('name price _id')
        .exec()
        .then(doc => {
            if (doc) {
                res.status(200).json({
                    product: doc
                });
            } else {
                res.status(404).json({
                    message: 'No valid entry found for the provided id '
                });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });

});

router.put('/:productId', (req, res, next) => {
    const id = req.params.productId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Prodcut.update({
        _id: id
    }, {
        $set: updateOps
    }).exec().then(
        res.status(204).json({
            message: 'Entity has been updated'
        })
    ).catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    });
});


router.delete('/:productId', (req, res, next) => {
    const id = req.params.productId;
    Prodcut.remove({
        _id: id
    }).exec().then(
        res.status(204).json({
            message: 'Enty has been deleted'
        })
    ).catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    });


});
module.exports = router;