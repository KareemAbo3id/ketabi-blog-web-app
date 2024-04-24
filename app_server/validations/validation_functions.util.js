// IMPORTANT devided the validations into several files

/**
 * ### Validate Email Address
 * Validate the email address by regex pattern.
 * @param {String} p_emailAddress
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
 * ### Validate Username
 * Validate the username by length.
 * @param {String} p_username
 */
const f_validate_username = (p_username) => {
  let usernameMax = 255;
  let usernameMin = 8;
  let usernameRegex = /^[a-zA-Z0-9_]*$/;
  if (
    p_username.length < usernameMin ||
    p_username.length > usernameMax ||
    !p_username.match(usernameRegex) ||
    !p_username
  ) {
    return true;
  }
};

/**
 * ### Check if userCredentials exists in DB
 * Check if the user credentials exist in the database.
 * @param {Object} p_userCredentials
 */
const f_check_userCredentials = (p_userCredentials) => {
  return p_userCredentials ? true : false;
};

// export the functions:
export {
  f_validate_email_address,
  f_validate_username,
  f_check_userCredentials,
};
