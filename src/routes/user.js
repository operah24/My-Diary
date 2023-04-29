const express = require('express');
const {registerUser} = require('../controllers/users/user');

const router = new express.Router();
router.get('/registerUser', registerUser);

module.exports = router;
