const { sendSuccessResponse, sendErrorResponse } = require("../../helpers/utility");

const registerUser = async (req, res) =>{
  try {
    const {email, password} = req.body;
    const foundUser = await findOneByParam({email, password});
    if(foundUser){
        return sendErrorResponse(res, {}, "USER_ALREADY_REGISTERED");
    }
    const user = await registerUser(req.body);
    return await sendSuccessResponse(res, {user}, "working");
  } catch (error) {
    return sendErrorResponse(res, error, "ERROR_OCCURED_WHILE_REGISTERING_USER");
  }
};

module.exports = {registerUser};