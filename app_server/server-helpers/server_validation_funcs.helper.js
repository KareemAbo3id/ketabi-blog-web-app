/**
 * @fileoverview This file contains the server validation functions
 * @module server_validation_funcs
 * @KareemAbo3id
 */

/**
 * ### Validate Email Address
 * Validate the email address by regex pattern.
 * @param {String} p_emailAddress
 * @returns {Boolean}
 */
const f_validate_email_address = (p_emailAddress) => {
  if (
    !p_emailAddress ||
    p_emailAddress.length < 5 ||
    p_emailAddress.length > 255 ||
    !p_emailAddress.match(/\S+@\S+\.\S+/)
  ) {
    return false;
  }
};

/**
 * ### Validate Password
 * Validate the password by length and regex pattern.
 * @param {String} p_password
 * @returns {Boolean}
 */
const f_validate_password = (p_password) => {
  if (
    // make sure the password is not empty and between 8 and 30 characters
    !p_password ||
    p_password.length < 8 ||
    p_password.length > 30 ||
    // make sure the password contains at least one lowercase letter, one uppercase letter, and one number
    !p_password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,30}$/)
  ) {
    return false;
  }
};

/**
 * ### Validate Username
 * Validate the username by length.
 * @param {String} p_username
 * @returns {Boolean}
 */
const f_validate_username = (p_username) => {
  if (!p_username || p_username.length < 5 || p_username.length > 255) {
    return false;
  }
};

/**
 * ### Check if userCredentials exists in DB
 * Check if the user credentials exist in the database.
 * @param {Object} p_userCredentials
 * @returns {Boolean}
 */
const f_check_userCredentials = (p_userCredentials) => {
  return p_userCredentials ? true : false;
};

// export the functions:
export {
  f_validate_email_address,
  f_validate_password,
  f_validate_username,
  f_check_userCredentials,
};
