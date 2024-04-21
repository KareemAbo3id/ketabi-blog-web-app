import asyncHandler from "express-async-handler";
import { StatusCodes } from "http-status-codes";
import bcrypt from "bcryptjs";
import Model_UserData from "../../../server-data-models/user_data.model.js";
import f_utl_json_response from "../../../server-helpers/set_json_response.helper.js";
import f_get_server_validation_messages from "../../../server-helpers/server_validation_messages.helper.js";
import f_set_password_updated_mail_template from "../../../server-templates/mail-templates-setters/inform/set_password_updated_mail.temp.js";
import { f_check_userCredentials } from "../../../server-helpers/server_validation_funcs.helper.js";
import f_send_transactional_email from "../../../server-services/mailing/send_transactional_email.service.js";

const {
  Message_UserNotFound,
  Message_PasswordsNotMatch,
  Message_TokenNotValidExpired,
  Message_NewPasswordSameAsOldOne,
  Message_PasswordUpdated,
} = f_get_server_validation_messages();

/**
 * ### Controller function for resetting the user's password.
 *
 * @endpoint `/user/auth/reset-password/{TEMP_RESET_PASSWORD_TOKEN}`
 * @method PATCH
 * @access public
 */
const f_control_reset_password = asyncHandler(async (request, response) => {
  //
  // 1. get the `TEMP_RESET_PASSWORD_TOKEN` from the URL
  const { TEMP_RESET_PASSWORD_TOKEN } = request.params;

  // 2. get the new password and confirm new password from request body:
  const { DATA_NEW_PASSWORD, DATA_CONFIRM_NEW_PASSWORD } = request.body;

  // 3. SERVER VALIDATION:

  // find user credentials in DB:
  const v_get_user_credentials = await Model_UserData.findOne({
    TEMP_RESET_PASSWORD_TOKEN,
  }).select("+DATA_PASSWORD");

  // check if user credentials are true (retrieved):
  if (!f_check_userCredentials(v_get_user_credentials)) {
    response.status(StatusCodes.NOT_FOUND);
    throw new Error(
      `${Message_TokenNotValidExpired} or ${Message_UserNotFound}`
    );
  }

  // check if the token is expired:
  if (v_get_user_credentials.TEMP_RESET_PASSWORD_TOKEN_EXPIRES < Date.now()) {
    response.status(StatusCodes.BAD_REQUEST);
    throw new Error(Message_TokenNotValidExpired);
  }

  // check if DATA_NEW_PASSWORD and DATA_CONFIRM_NEW_PASSWORD are equal:
  if (DATA_NEW_PASSWORD !== DATA_CONFIRM_NEW_PASSWORD) {
    response.status(StatusCodes.BAD_REQUEST);
    throw new Error(Message_PasswordsNotMatch);
  }

  // check if DATA_NEW_PASSWORD is equal to DATA_PASSWORD:
  const v_isDbPasswordEqualCurrentPassword = await bcrypt.compare(
    DATA_NEW_PASSWORD,
    v_get_user_credentials.DATA_PASSWORD
  );

  if (v_isDbPasswordEqualCurrentPassword) {
    response.status(StatusCodes.BAD_REQUEST);
    throw new Error(Message_NewPasswordSameAsOldOne);
  }

  // 4. update the user password in the database:
  v_get_user_credentials.DATA_PASSWORD = DATA_NEW_PASSWORD;

  // 5. delete the token and token expiry time from the database:
  v_get_user_credentials.TEMP_RESET_PASSWORD_TOKEN = undefined;
  v_get_user_credentials.TEMP_RESET_PASSWORD_TOKEN_EXPIRES = undefined;

  // save the update:
  await v_get_user_credentials.save();

  // 6. send a response to the user that the password has been updated:

  // set message fields:
  const { messageFields } = f_set_password_updated_mail_template(
    v_get_user_credentials.DATA_FIRSTNAME,
    v_get_user_credentials.updatedAt
  );

  // send email:
  f_send_transactional_email(
    {
      // eslint-disable-next-line no-undef
      from: process.env.V_EMAIL_SERVER_SENDER,
      to: v_get_user_credentials.DATA_EMAIL_ADDRESS,
      subject: messageFields.subject,
      message: messageFields.message,
      html: messageFields.html,
    },
    response
  );

  // the result:
  response
    .status(StatusCodes.CREATED)
    .json(f_utl_json_response(Message_PasswordUpdated));
});

export default f_control_reset_password;

/**
 * @swagger
 * /user/auth/reset-password/{TEMP_RESET_PASSWORD_TOKEN}:
 *   patch:
 *     summary: Reset password.
 *     description: Take temporary token from URL params, new password and confirm new password from request body, validate them, reset the password, and send an email to the user.
 *     tags:
 *       - User APIs
 *     parameters:
 *       - in: path
 *         name: TEMP_RESET_PASSWORD_TOKEN
 *         required: true
 *         schema:
 *           type: string
 *         description: Temporary token to reset the password
 *     requestBody:
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             required:
 *               - DATA_NEW_PASSWORD
 *               - DATA_CONFIRM_NEW_PASSWORD
 *             properties:
 *               DATA_NEW_PASSWORD:
 *                 description: "User password: validation: at least 6 characters, at least 1 uppercase, 1 lowercase, 1 number, 1 special character"
 *                 type: string
 *                 example: "123456"
 *               DATA_CONFIRM_NEW_PASSWORD:
 *                 description: "User confirm password: validation: at least 6 characters, at least 1 uppercase, 1 lowercase, 1 number, 1 special character"
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       "201":
 *         description: "_CREATED_ Password updated successfully, email sent to the user email address"
 *       "400":
 *         description: "_BAD_REQUEST_ Client passwords not match or token expired or new password same as old one"
 *       "404":
 *         description: "_NOT_FOUND_ User not found or token expired"
 */
