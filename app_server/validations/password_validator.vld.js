import passwordValidator from "password-validator";

/**
 * ### Returns the validation schema for password validation.
 * @moduletype Validation
 *
 * @returns {object} The validation schema object.
 */
const f_vld_validation_schema = () => {
  // validation schema instance:
  const v_validation_schema = new passwordValidator();

  // validation schema added properties:
  const schema = v_validation_schema
    // min 8 characters.
    .is()
    .min(8)
    // max 16 characters.
    .is()
    .max(16)
    // has 1 uppercase character.
    .has()
    .uppercase(1)
    // has 1 lowercase character.
    .has()
    .lowercase(1)
    // has 1 number.
    .has()
    .digits(1)
    // has 1 special character.
    .has()
    .symbols(1)
    // has no spaces.
    .has()
    .not()
    .spaces();

  return schema;
};

/**
 * ### Validates a password using the validation schema via the password-validator package.
 * @moduletype Validation
 *
 * @param {string} p_password The password to be validated.
 * @returns {boolean} The result of the validation.
 */
const f_vld_password_validator = (p_password) => {
  const schema = f_vld_validation_schema();
  return schema.validate(p_password);
};

export default f_vld_password_validator;
