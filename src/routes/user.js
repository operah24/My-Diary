const express = require('express');
const {registerUser, userLogin, isUser} = require('../controllers/users/user');
const { validateRegisterUser } = require('../middlewares/validation');
const { autheticateUser } = require('../middlewares/middlewares');

const router = new express.Router();
router.post('/registerUser', validateRegisterUser, registerUser);
router.post('/login', userLogin);
router.post("/welcome", autheticateUser, isUser);

module.exports = router;
