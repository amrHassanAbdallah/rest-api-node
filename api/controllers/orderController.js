const mongoose = require("mongoose");
const Order = require("../models/order");
const Product = require("../models/product");


exports.order_get_all = (req, res, next) => {
  Order.find()
    .select("product quantity _id")
    .populate("product", "name")
    .exec()
    .then(docs => {
      res.status(200).json({
        count: docs.length,
        orders: docs.map(doc => {
          return {
            product: doc.product,
            quantity: doc.quantity,
            _id: doc._id,
            links: {
              self: "localhost:3000/orders/" + doc._id
            }
          };
        })
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

exports.orders_create = (req, res, next) => {
  Product.findById(req.body.productId)
    .then(prodcut => {
      if (prodcut) {
        const order = new Order({
          _id: new mongoose.Types.ObjectId(),
          quantity: req.body.quantity,
          product: req.body.productId
        });

        return order.save();
      } else {
        return res.status(500).json({
          message: "No valid entry found for the provided id "
        });
      }
    })
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "handling POST request to /orders",
        order: {
          quantity: result.quantity,
          product: result.product,
          _id: result._id
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

exports.orders_get_one = (req, res, next) => {
  const id = req.params.orderId;
  let order = Order.findById(id)
    .select("product quantity _id")
    .populate("product")
    .exec()
    .then(doc => {
      if (doc) {
        res.status(200).json({
          order: doc
        });
      } else {
        res.status(404).json({
          message: "No valid entry found for the provided id "
        });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

exports.orders_update = (req, res, next) => {
  const id = req.params.orderId;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  Order.update({ _id: id }, { $set: updateOps })
    .exec()
    .then(
      res.status(204).json({
        message: "Entity has been updated"
      })
    )
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

exports.order_delete = (req, res, next) => {
  const id = req.params.orderId;
  Order.remove({ _id: id })
    .exec()
    .then(
      res.status(204).json({
        message: "Enty has been deleted"
      })
    )
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};