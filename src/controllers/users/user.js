const bcrypt = require("bcrypt");
const { sign } = require('jsonwebtoken');
const { sendSuccessResponse, sendErrorResponse } = require("../../helpers/utility");
const {registerNewUser, findOneByParam} = require('../../respositories/user');

exports.registerUser = async (req, res) =>{
  try {
    const {email} = req.body;
    const foundUser = await findOneByParam({email});
    if(!foundUser){
        return sendErrorResponse(res, {}, "USER_ALREADY_REGISTERED");
    }
    const user = await registerNewUser (req.body);
    return await sendSuccessResponse(res, {user}, "SUCCESSFULLY_REGISTERED");
  } catch (error) {
    return sendErrorResponse(res, error, "ERROR_OCCURED_WHILE_REGISTERING_USER");
  }
};

exports.userLogin = async (req, res) => {
    try {
        const {email, password} = req.body;
        const foundUser = await findOneByParam({email});
        if(!foundUser){
            return sendErrorResponse(res, {}, "EMAIL_OR_PASSWORD_DOES_NOT_EXIST");
        }
        const isValid = bcrypt.compareSync(password, foundUser.data.password);
        if (!isValid) {
            return sendErrorResponse(res, {}, "EMAIL_OR_PASSWORD_DOES_NOT_EXIST");
        }
        
        
        
        const token = sign(
            {
                id: foundUser._id,
            },
            "ESTHER",
            { expiresIn: "24h" }
        );
        const user = {
            token,
            user: {
                _id: foundUser.data._id,
                userName: foundUser.data.userName,
                email: foundUser.data.email,
            },
        };
        
        return sendSuccessResponse(res, user, "USER_LOGIN_SUCCESSFULLY");
    } catch (error) {
        console.log(error);
        return sendErrorResponse(res, error, "ERROR_OCCURED_WHILE_LOGING_IN_USER");
    }
};