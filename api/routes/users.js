const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');


const User = require("../models/user");

router.post("/signup",  (req, res, next) => {
    User.find({
        email: req.body.email
    }).exec()
    .then(user=>{
    console.log("user after");
        
        if(user.length>=1){
            
            return res.status(422).json({
                message:"mail exist"
            })
        }
       bcrypt.hash(req.body.password, 10, (err, hash) => {
         if (err) {
           return res.status(500).json({ error: err });
         }

         const user = new User({
           _id: new mongoose.Types.ObjectId(),
           email: req.body.email,
           password: hash
         });

         user
           .save()
           .then(result => {
             console.log(result);
             res
               .status(201)
               .json({
                 message: "handling POST request to /products",
                 user:{
                   email:user.email,
                   password:req.body.password
                 }
               });
           })
           .catch(err => {
             console.log(err);
             res.status(500).json({ error: err });
           });
       }); 
    });

    
    
    
  
});


router.post("/login", (req, res, next) => {
  User.findOne({ email: req.body.email })
    .exec()
    .then(user => {
      console.log("user after");

      if (user) {
          bcrypt.compare(req.body.password,user.password,(err,result)=>{
              if(err){
                return res
                  .status(401)
                  .json({
                    message:
                      "user not found , user does't exist or wrong passwoord."
                  });
              } 
              if (result) {
                let token = jwt.sign({
                  email: user.email,
                  userId:user._id
                },process.env.JWT_KEY,
                  {
                      expiresIn:"1h"
              })
                return res
                  .status(200)
                  .json({
                    message:
                      "Auth successful.",
                      "token":token
                  });
              }  

          });

      }else{
                return res
                  .status(401)
                  .json({
                    message:
                      "user not found , user does't exist or wrong passwoord."
                  });

      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});



router.delete("/:userId", (req, res, next) => {
  const id = req.params.userId;
  User.remove({
    _id: id
  })
    .exec()
    .then((result)=>{
res.status(204).json({
  message: "Enty has been deleted"
});
    }
      
    )
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});
module.exports = router;
