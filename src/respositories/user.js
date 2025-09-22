const UserModel = require("../models/user");
const bcrypt = require('bcrypt');
const {sign} = require ("jsonwebtoken");


const findOneByParam =  async(matchParam) => {
    const user = await UserModel.findOne(matchParam).exec();
    return {
      data: user
    };
};





const registerNewUser = async (payload) => {
    try {
        // Create a new user instance
        let newUser = new UserModel();
        newUser.email = payload.email;
        newUser.password = payload.password;
        newUser.userName = payload.userName;

        // Hash the password before saving it
        const salt = await bcrypt.genSalt(10);
        newUser.password = await bcrypt.hash(newUser.password, salt);

        // Save the user to the database
        const user = await newUser.save();

        // Generate a token with user details
        const token = sign(
            {
                id: user._id,
                email: user.email,
                userName: user.userName
            },
            "ESTHER",
            { expiresIn: "24h" }
        );

        // Return the token and user information
        return {
            error: false,
            token,
            user
        };
    } catch (error) {
        console.error('Error registering new user:', error);
        return {
            error: true,
            message: 'Error registering new user'
        };
    }
};


module.exports = {findOneByParam, registerNewUser};