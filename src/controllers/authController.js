const { Router } = require('express');
const router = Router();

const User = require('../models/user');

router.post('/signup', async (req, res, next) => {
    const { username, email, password } = req.body;
    const user = new User({
        username: username,
        email: email,
        password: password
    });
    user.password = await user.encryptPassword(user.password);
    await user.save();
    
    res.json({message: 'Received'})
}) 

router.post('/signin', (req, res, next) => {
    res.json('signin');
})

router.get('/me', (req, res, next) => {
    res.json('me');
})

module.exports = router;