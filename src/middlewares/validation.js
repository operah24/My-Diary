const Joi = require('joi');
const { sendErrorResponse } = require('../helpers/utility');

const handleValidationError = (validatedData, res) => {
    const message = validatedData.error.details[0].message;
    return sendErrorResponse(res, {}, message);
  };

const validateRegisterUser = (req, res, next) => {
    const schema = Joi.object({
        userName: Joi.string().min(2).max(30).required(),
        email: Joi.string().email().required(),
        password: Joi.string().required().min(5),
    }).required();
    const validated = schema.validate(req.body);
    if (validated.error) {
      return handleValidationError(validated, res);
    }
    return next();
};

module.exports = {validateRegisterUser};