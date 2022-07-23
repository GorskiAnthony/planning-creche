const Joi = require("joi");

module.exports = Joi.object({
  old_password: Joi.string().required(),
  password: Joi.string().pattern(
    new RegExp(
      "^(?=.*\\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\\w\\d\\s:])([^\\s]){8,16}$"
    )
  ),
  repeat_password: Joi.ref("password"),
});
