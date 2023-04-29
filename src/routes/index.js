const express = require('express');
const userRoutes = require('../routes/user');


const router = express.Router();
router.use('/auth',userRoutes);


module.exports = router;