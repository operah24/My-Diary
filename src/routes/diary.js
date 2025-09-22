const express = require('express');
const { addDiary, updateDiary, getDiary } = require('../controllers/diaries/diary');
const { autheticateUser } = require('../middlewares/middlewares');

const router = new express.Router();

router.post("/create", autheticateUser, addDiary);
router.put("/:id/update", autheticateUser, updateDiary);
router.get("/:id", autheticateUser,getDiary);

module.exports = router;