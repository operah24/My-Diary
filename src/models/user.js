const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserSchema = new Schema({
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    Diaries: [
        {
            type: mongoose.Types.ObjectId,
            ref: "diary"
        }
    ]
});

const UserModel = mongoose.model("user", UserSchema);

module.exports = UserModel;