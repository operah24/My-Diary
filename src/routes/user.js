const express = require('express');
const {registerUser, userLogin} = require('../controllers/users/user');
const { validateRegisterUser } = require('../middlewares/validation');

const router = new express.Router();
router.post('/registerUser', validateRegisterUser, registerUser);
router.post('/login', userLogin);

module.exports = router;
