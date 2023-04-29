require('dotenv/config');
const mongoose = require('mongoose');
const url = process.env.DATABASE_URL;

mongoose.connect(url, {
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(() => {
    console.log("DB Connected");
}).catch(error => {
    console.log(error);
});

mongoose.connection.on('error',function (err) {
    console.log('Mongoose connection error: ' + err);
});
mongoose.connection.on('disconnected', function () {
    console.log('Mongoose disconnected');
});

require('./user');
require('./diary');
