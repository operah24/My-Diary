const { verify } = require("jsonwebtoken");
const { sendErrorResponse } = require("../helpers/utility");
const UserModel = require("../models/user");



exports.autheticateUser = async (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
        return sendErrorResponse(res, {}, 'AUTHETICATION FAILED', 401);
    }
  
    try {
        console.log(token);
      const { id } = verify(token, "ESTHER");
      console.log(id);
      const user = await UserModel.findById(id);
      if (user) {
        req.user = user;
        return next();
      }
      return sendErrorResponse(res, {}, 'USER NOT FOUND', 401);
    } catch (error) {
        console.log(error);
        return sendErrorResponse(res, {}, 'BAD TOKEN', 401);
    }
};