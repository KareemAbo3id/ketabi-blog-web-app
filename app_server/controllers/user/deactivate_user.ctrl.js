import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import { StatusCodes } from "http-status-codes";
import Model_UserData from "../../../server-data-models/user_data.model.js";
import f_delete_httponly_cookie from "../../../server-services/cookies/delete_httponly_cookie.service.js";
import f_utl_json_response from "../../../server-helpers/set_json_response.helper.js";
import f_get_server_validation_messages from "../../../server-helpers/server_validation_messages.helper.js";
import { f_validate_password } from "../../../server-helpers/server_validation_funcs.helper.js";
import f_send_transactional_email from "../../../server-services/mailing/send_transactional_email.service.js";
import f_set_account_deactivated_mail_template from "../../../server-templates/mail-templates-setters/inform/set_account_deactivated_mail.temp.js";

const {
  Message_PasswordNotValid,
  Message_PasswordsNotMatch,
  Message_UserDeactivated,
} = f_get_server_validation_messages();

/**
 * ### Controller function to deactivate a user account.
 *
 * @link `/user/checkpoint/deactivate-account/{DATA_USERNAME}`
 * @method PATCH
 * @access private
 */
const f_control_deactivate_account = asyncHandler(async (request, response) => {
  //
  // 1. get `DATA_USERNAME` from request params:
  const { DATA_USERNAME } = request.params;

  // 2. get required data from request body: (DATA_TYPED_DEACTIVATION_REASON is optional)
  const {
    DATA_TYPED_DEACTIVATION_REASON,
    DATA_TYPED_PASSWORD,
    DATA_CONFIRM_TYPED_PASSWORD,
  } = request.body;

  // 3. SERVER VALIDATION:

  // check password conditions:
  if (f_validate_password(DATA_TYPED_PASSWORD || DATA_CONFIRM_TYPED_PASSWORD)) {
    response.status(StatusCodes.BAD_REQUEST);
    throw new Error(Message_PasswordNotValid);
  }

  // check if DATA_TYPED_PASSWORD and DATA_CONFIRM_TYPED_PASSWORD are equal:
  if (DATA_TYPED_PASSWORD !== DATA_CONFIRM_TYPED_PASSWORD) {
    response.status(StatusCodes.BAD_REQUEST);
    throw new Error(Message_PasswordsNotMatch);
  }

  // 4. find user credentials in DB:
  const v_get_user_credentials = await Model_UserData.findOne({
    DATA_USERNAME,
  }).select("+DATA_PASSWORD");

  // 5. compare DATA_TYPED_PASSWORD with the user's DATA_PASSWORD in DB:
  const v_isDbPasswordEqualCurrentPassword = await bcrypt.compare(
    DATA_TYPED_PASSWORD,
    v_get_user_credentials.DATA_PASSWORD
  );

  // if does not match, throw an error:
  if (!v_isDbPasswordEqualCurrentPassword) {
    response.status(StatusCodes.BAD_REQUEST);
    throw new Error(Message_PasswordsNotMatch);
  }

  // 6. update the FLAG_ACCOUNT_ACTIVATED to false and save the user credentials:
  v_get_user_credentials.FLAG_ACCOUNT_ACTIVATED = false;
  v_get_user_credentials.DATA_DEACTIVATION_REASON =
    DATA_TYPED_DEACTIVATION_REASON;

  // save the update:
  await v_get_user_credentials.save();

  // 7. delete the http-only cookie:
  f_delete_httponly_cookie(response);

  // 8. send a response to the user that the account has been deactivated:

  // set message fields:
  const { messageFields } = f_set_account_deactivated_mail_template(
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
    .json(
      f_utl_json_response(
        `(@${v_get_user_credentials.DATA_USERNAME}) ${Message_UserDeactivated}`
      )
    );
});

export default f_control_deactivate_account;

/**
 * @swagger
 * /user/checkpoint/deactivate-account/{DATA_USERNAME}:
 *   patch:
 *     summary: Deactivate user account.
 *     description: Deactivate user account, set FLAG_ACCOUNT_ACTIVATED to false, log out the user, send an email.
 *     tags:
 *       - User APIs
 *     parameters:
 *       - in: path
 *         name: DATA_USERNAME
 *         required: true
 *         schema:
 *           type: string
 *         description: "User username"
 *     requestBody:
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             required:
 *               - DATA_TYPED_PASSWORD
 *               - DATA_CONFIRM_TYPED_PASSWORD
 *             properties:
 *               DATA_TYPED_PASSWORD:
 *                 description: "User password: validation: at least 6 characters, at least 1 uppercase, 1 lowercase, 1 number, 1 special character"
 *                 type: string
 *                 example: "123456"
 *               DATA_CONFIRM_TYPED_PASSWORD:
 *                 description: "User confirm password: validation: at least 6 characters, at least 1 uppercase, 1 lowercase, 1 number, 1 special character"
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       "201":
 *         description: "_CREATED_ User account deactivated, log out, email sent"
 *       "400":
 *         description: "_BAD_REQUEST_ Passwords do not match or not valid"
 */
