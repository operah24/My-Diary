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
    let newUser = await new UserModel();
    newUser.email = payload.email;
    newUser.password = payload.password;
    newUser.userName = payload.userName;

   
    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(newUser.password, salt);
    // encryptedPassword = await bcrypt.hash(password, 10);
    const user = await newUser.save();

    // const token = jwt.sign(
    //   { user_id: user._id, email },
    //   process.env.TOKEN_KEY,
    //   {
    //     expiresIn: "2h",
    //   }
    // );

    const token = sign(
      {
        id: user._id,
      },
      "ESTHER",
      { expiresIn: "24h" }
    );
    return{
        error: false,
        token,
        user
        
    };

};

module.exports = {findOneByParam, registerNewUser};