const express = require('express');
const { add } = require('../controllers/diaries/diary');
const { autheticateUser } = require('../middlewares/middlewares');

const router = new express.Router();

router.post("/create", autheticateUser, add);

module.exports = router;