const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let DiarySchema = new Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    author: {
        type: String
    },
    createdDate: {
        type: Date
    },
    updatedDate: {
        type: Date,
        default: Date.now()
    },
    
});

const DiaryModel = mongoose.model("diary", DiarySchema);

module.exports = DiaryModel;