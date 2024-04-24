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
