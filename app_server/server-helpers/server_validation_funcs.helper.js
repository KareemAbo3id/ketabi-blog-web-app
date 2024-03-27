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
  let passRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
  let passMin = 8;
  let passMax = 30;
  if (
    p_password.length < passMin ||
    p_password.length > passMax ||
    !p_password.match(passRegex) ||
    !p_password
  ) {
    return true;
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
