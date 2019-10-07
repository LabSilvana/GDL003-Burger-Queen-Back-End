const { Router } = require('express');
const router = Router();
const User = require('../models/user');
const jwt = require (`jsonwebtoken`);
const config= require(`../config`);

router.post('/signup', async (req, res, next) => {
    const { username, email, password } = req.body;
    const user = new User({
        username: username,
        email: email,
        password: password
    })
   user.password = await user.encryptPassword(user.password)
   await user.save();
   console.log(user);
   const token = jwt.sign({id: user._id}, config.secret,{
       expiresIn: 60 * 60 * 24 
   })
    res.json({auth:true, token})
}) 

router.post('/signin', (req, res, next) => {
    res.json('signin');
})

router.get('/createToken', async (req, res, next) => {
    const token =req.headers[`token`];
    if(!token){
        return res.status(401).json({
            auth:false,
            message: "no token provided "
        });
    }
    const decode = jwt.verify(token, config.secret);
    const user=await User.findById(decode.id);
    if(!user){
        return res.status(404).send("no user found");
    }
    res.json(user);
})

module.exports = router;