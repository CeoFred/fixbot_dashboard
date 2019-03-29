const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {
    check,
    validationResult,body
} = require('express-validator/check');

const {
    sanitizeBody
} = require('express-validator/filter');
const User = require('../models/users');

const {empty,success,exists,failed,created,invalid} = require('../response');

router.post('/login', [
    // username must be an email
    check('email').isEmail().withMessage('A valid email is required to signin')
],(req,res,next) => {
        // Finds the validation errors in this request and wraps them in an object with handy functions
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
           return invalid(res,errors)
        }

User.find({ email: req.body.email })
    .exec()
    .then(user => {
    if(user.length < 1){
         failed(res,{
            message:"Invalid email, try signing up"
        });
    }else{
        bcrypt.compare(req.body.password, user[0].password, function(err, result) {
            // res == true
            if(err){
                return res.status(401).json({
                    message:"Failed"
                });
            }
            if(result){

                const token = jwt.sign({
                     email: user[0].email,
                     userId: user[0]._id
                    },
                     process.env.JWT_SECRET_KEY,
                     {
                         expiresIn:"1h"
                     });
                 req.headers.authorization = 'Bearer '+ token;
              return  success(res,{
                    message:"Success",
                    token: token,
                    userId:user[0]._id,
                    expires:60*60*60
                })
            }
            return res.status(401).json({
                message:"Failed"
            });

        });}
})
.catch(err => {
    console.log(err)
})
});

router.post('/signup', [body('email')
            .isEmail()
            .normalizeEmail(),
            sanitizeBody(['firstname','lastname','phonenumber','email']).trim(),
        ], (req, res, next) => {
    const {email,firstname,lastname,password,phonenumber} = req.body;
   const params = req.body;
    let faults = [];
   for (const key in params) {
   const element = params[key];
    if(element.length <= 0){
        faults.push(key)
    }
   }
   if(faults.length > 0){
   success(res, `you left the following fields empty ${faults}`)
   }

    User.find({email:req.body.email}).exec()
    .then(user => {
        if(user.length >= 1){
            exists(res,'Email already exist')
        }else{

    bcrypt.hash(password,10,(err,hash) => {
        if(err){
            res.status(500).json({
                error: err
                    });
                }else{

    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        email: email,
        password: hash,
        phonenumber,
        firstname,
        lastname
                });
                user.save()
                .then(result => {
                            created(res,{message:"User successfully SignedUp",
                                data: result
                            });
                })
                .catch(err => {
                    res.status(500).header('Error:True').json({
                        message:err
                    });
                })
            }
        });

        }
    })
    .catch(err => {
        res.status(500).json({
            message:err
        })
    });

});

router.delete('/:userId',(req,res,next) =>{
    User.remove({_id: req.params.userId})
    .exec()
    .then(result => {
        res.status(201).header('Validated:True').json({
            message:"User deleted",
            data: result
        })
    })
    .catch(err => {
        res.status(500).json({
            message:err
        });
    });
})

module.exports = router;