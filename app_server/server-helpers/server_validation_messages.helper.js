/**
 * @fileoverview This file contains the server validation string messages
 * @module server_validation_messages
 * @KareemAbo3id
 */

/**
 * ### Get server validation messages
 * ```
 * const { EmailNotValid } = f_get_server_validation_messages();
 * ```
 */
function f_get_server_validation_messages() {
  // email validation messages:
  const Message_EmailNotValid = "Email address is not valid, please try again";
  const Message_PasswordNotValid = `Password must be between 8 and 30 characters, and contain at least one lowercase letter, one uppercase letter, and one number`;
  const Message_UsernameNotValid = `Username must be between 5 and 255 characters`;

  // wrong credentials messages:
  const Message_UserNotFound = `User not found, please try again`;
  const Message_WrongPassword = `Wrong password, please try again`;
  const Message_WrongEmail = `Wrong email, please try again`;
  const Message_WrongUsername = `Wrong username, please try again`;
  const Message_WrongEmailPassword = `Wrong email or password, please try again`;
  const Message_PasswordsNotMatch = `Passwords do not match, please try again`;
  const Message_TokenNotValidExpired = `Token is not valid or expired, please try again`;
  const Message_PasswordsMatch = `New password can't be the same as the old password`;

  // already exists messages:
  const Message_EmailExists = `Email address already exists, please try another email address`;
  const Message_UsernameExists = `Username already exists, please try another username`;

  // success messages:
  const Message_EmailVerified = `User Email address verified`;
  const Message_PasswordUpdated = `Password updated`;
  const Message_ProfileUpdated = `Profile updated`;
  const Message_PasswordReset = `Password reset`;
  const Message_UserLoggedIn = `user logged in, token generated and saved in cookie`;
  const Message_UserLoggedOut = `User logged out, token removed from cookie`;
  const Message_UserDeactivated = `User deactivated, token removed from cookie`;
  const Message_UserReactivated = `User reactivated, token generated and saved in cookie`;
  const Message_UserCreated = `user signed up, token generated and saved in cookie`;
  const Message_ResetPasswordLinkSent = `Reset password link sent to your email address`;

  // general server messages:
  const Message_InternalServerError = `Something went wrong, please try again later`;

  //
  return {
    /**
     * ```
     * "Email address is not valid, please try again"
     * ```
     */
    Message_EmailNotValid,
    /**
     * ```
     * "Password must be between 8 and 30 characters, and contain at least one lowercase letter, one uppercase letter, and one number"
     * ```
     */
    Message_PasswordNotValid,
    /**
     * ```
     * "Username must be between 5 and 255 characters"
     * ```
     */
    Message_UsernameNotValid,
    /**
     * ```
     * "User not found, please try again"
     * ```
     */
    Message_UserNotFound,
    /**
     * ```
     * "Wrong password, please try again"
     * ```
     */
    Message_WrongPassword,
    /**
     * ```
     * "Wrong email, please try again"
     * ```
     */
    Message_WrongEmail,
    /**
     * ```
     * "Wrong username, please try again"
     * ```
     */
    Message_WrongUsername,
    /**
     * ```
     * "Wrong email or password, please try again"
     * ```
     */
    Message_WrongEmailPassword,
    /**
     * ```
     * "Passwords do not match, please try again"
     * ```
     */
    Message_PasswordsNotMatch,
    /**
     * ```
     * "Token is not valid or expired, please try again"
     * ```
     */
    Message_TokenNotValidExpired,
    /**
     * ```
     * "New password can't be the same as the old password"
     * ```
     */
    Message_PasswordsMatch,
    /**
     * ```
     * "Email address already exists, please try another email address"
     * ```
     */
    Message_EmailExists,
    /**
     * ```
     * "Username already exists, please try another username"
     * ```
     */
    Message_UsernameExists,
    /**
     * ```
     * "User Email address verified"
     * ```
     */
    Message_EmailVerified,
    /**
     * ```
     * "Password updated"
     * ```
     */
    Message_PasswordUpdated,
    /**
     * ```
     * "Profile updated"
     * ```
     */
    Message_ProfileUpdated,
    /**
     * ```
     * "Password reset"
     * ```
     */
    Message_PasswordReset,
    /**
     * ```
     * "user logged in, token generated and saved in cookie"
     * ```
     */
    Message_UserLoggedIn,
    /**
     * ```
     * "User logged out, token removed from cookie"
     * ```
     */
    Message_UserLoggedOut,
    /**
     * ```
     * "User deactivated, token removed from cookie"
     * ```
     */
    Message_UserDeactivated,
    /**
     * ```
     * "User reactivated, token generated and saved in cookie"
     * ```
     */
    Message_UserReactivated,
    /**
     * ```
     * "user signed up, token generated and saved in cookie"
     * ```
     */
    Message_UserCreated,
    /**
     * ```
     * "Reset password link sent to your email address"
     * ```
     */
    Message_ResetPasswordLinkSent,
    /**
     * ```
     * "Internal server error, please try again later"
     * ```
     */
    Message_InternalServerError,
  };
}

export default f_get_server_validation_messages;
