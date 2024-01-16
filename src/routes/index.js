const express = require('express');
const userRoutes = require('../routes/user');
const diaryRoutes = require('../routes/diary');


const router = express.Router();
router.use('/auth',userRoutes);
router.use('/diary',diaryRoutes);


module.exports = router;