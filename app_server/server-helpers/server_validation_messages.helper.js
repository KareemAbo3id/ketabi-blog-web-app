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
  const Message_UsernameNotValid = `Username must be between 8 and 255 characters long, and can only contain letters, numbers, and underscores`;

  // wrong credentials messages:
  const Message_UserNotFound = `User not found, please try again`;
  const Message_UserNotLoggedIn = `User not logged in`;
  const Message_WrongPassword = `Wrong password, please try again`;
  const Message_WrongEmail = `Wrong email, please try again`;
  const Message_WrongUsername = `Wrong username, please try again`;
  const Message_WrongEmailPassword = `Wrong email or password, please try again`;
  const Message_PasswordsNotMatch = `Passwords do not match, please try again`;
  const Message_NewPasswordSameAsOldOne = `New password cannot be the same as the old password. Please try again`;
  const Message_TokenNotValidExpired = `Token is not valid or expired, please try again`;

  // already exists messages:
  const Message_EmailExists = `Email address already exists, please try another email address`;
  const Message_UsernameExists = `Username already exists, please try another username`;

  // success messages:
  const Message_EmailVerified = `User Email address verified`;
  const Message_PasswordUpdated = `Password updated`;
  const Message_ProfileUpdated = `Profile updated`;
  const Message_PasswordReset = `Password reset`;
  const Message_UserLoggedIn = `user logged in`;
  const Message_UserLoggedOut = `User logged out`;
  const Message_UserDeactivated = `User deactivated`;
  const Message_UserReactivated = `User reactivated`;
  const Message_UserCreated = `Your account has been created, please check your email address to verify your account, if you didn't receive the email, please check your spam or junk folder.`;
  const Message_ResetPasswordLinkSent = `Your reset password link has been created, please check your email address to reset your password, if you didn't receive the email, please check your spam or junk folder.`;

  // general server messages:
  const Message_InternalServerError = `Something went wrong, please try again later`;

  // transactional email messages:
  const Message_TransactionalEmailSuccess = `Email sent successfully, please check your inbox or spam or junk folder`;
  const Message_TransactionalEmailFailed = `Email not sent, please try again`;
  const Message_ResetPasswordEmailSubject = `Password reset request - Ketabi app`;
  const Message_UpdatePasswordEmailSubject = `Password has been updated - Ketabi app`;
  const Message_VerifyEmailAddressRequest = `Welcome to Ketabi, Please Verify Your Email Address`;
  const Message_EmailVerifiedEmailSubject = `Welcome to Ketabi, Your Email has been Verified!`;

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
     * "User not logged in"
     * ```
     */
    Message_UserNotLoggedIn,
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
     * "New password cannot be the same as the old password. Please try again"
     * ```
     */
    Message_NewPasswordSameAsOldOne,
    /**
     * ```
     * "Token is not valid or expired, please try again"
     * ```
     */
    Message_TokenNotValidExpired,
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
    /**
     * ```
     * "Email sent successfully, please check your inbox or spam or junk folder"
     * ```
     */
    Message_TransactionalEmailSuccess,
    /**
     * ```
     * "Email not sent, please try again"
     * ```
     */
    Message_TransactionalEmailFailed,
    /**
     * ```
     * "Password reset request - Ketabi app"
     * ```
     */
    Message_ResetPasswordEmailSubject,
    /**
     * ```
     * "Password has been updated - Ketabi app"
     * ```
     */
    Message_UpdatePasswordEmailSubject,
    /**
     * ```
     * "Welcome to Ketabi, Please Verify Your Email Address"
     * ```
     */
    Message_VerifyEmailAddressRequest,
    /**
     * ```
     * "Welcome to Ketabi, Your Email has been Verified!"
     * ```
     */
    Message_EmailVerifiedEmailSubject,
  };
}

export default f_get_server_validation_messages;
