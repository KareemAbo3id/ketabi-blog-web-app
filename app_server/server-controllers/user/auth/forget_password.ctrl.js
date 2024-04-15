import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";
import Model_UserData from "../../../server-data-models/user_data.model.js";
import f_set_json_response from "../../../server-helpers/set_json_response.helper.js";
import f_get_server_validation_messages from "../../../server-helpers/server_validation_messages.helper.js";
import f_send_transactional_email from "../../../server-services/mailing/send_transactional_email.service.js";
import f_set_reset_password_mail_template from "../../../server-templates/mail-templates-setters/action/set_reset_password_mail.temp.js";
import f_get_url_base from "../../../server-helpers/get_base_url.helper.js";
import {
  f_check_userCredentials,
  f_validate_email_address,
} from "../../../server-helpers/server_validation_funcs.helper.js";

const {
  Message_EmailNotValid,
  Message_UserNotFound,
  Message_ResetPasswordLinkSent,
} = f_get_server_validation_messages();

/**
 * @swagger
 * /api/forgot-password:
 *   post:
 *     summary: Send reset password link to user's email inbox
 *     description: take user email address from the request body, validate it, create a token, save it in the database, generate a link with the token in the URL, send an email to the user with the link
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              DATA_EMAIL_ADDRESS:
 *                type: string
 *                format: email
 *     responses:
 *       "201":
 *         description: Reset password link sent
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Reset password link sent"
 *       "400":
 *         description: Email not valid
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Email not valid"
 *       "404":
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User not found"
 */
const f_control_forget_password = asyncHandler(async (request, response) => {
  //
  // 1. get the user email address from request body:
  const { DATA_EMAIL_ADDRESS } = request.body;

  // 2. SERVER VALIDATION:

  // check email conditions:
  if (f_validate_email_address(DATA_EMAIL_ADDRESS)) {
    response.status(StatusCodes.BAD_REQUEST);
    throw new Error(Message_EmailNotValid);
  }

  // find user credentials in DB:
  const v_get_user_credentials = await Model_UserData.findOne({
    DATA_EMAIL_ADDRESS,
  }).select("-DATA_PASSWORD");

  // check if user credentials are true (retrieved):
  if (!f_check_userCredentials(v_get_user_credentials)) {
    response.status(StatusCodes.NOT_FOUND);
    throw new Error(Message_UserNotFound);
  }

  // 3. create a token for reset password:
  const V_RESET_PASSWORD_TOKEN = jwt.sign(
    {
      _id: v_get_user_credentials._id,
    },
    // eslint-disable-next-line no-undef
    process.env.V_JWT_SECRET,
    {
      expiresIn: "90d",
    }
  );

  // 4. save the token in the database:
  v_get_user_credentials.TEMP_RESET_PASSWORD_TOKEN = V_RESET_PASSWORD_TOKEN;

  // set expiry time for the token to 1 hour:
  v_get_user_credentials.TEMP_RESET_PASSWORD_TOKEN_EXPIRES =
    Date.now() + 60 * 60 * 1000; // 1 hour

  // save the update:
  await v_get_user_credentials.save();

  // 5. generate a link with the token in the URL:
  const V_BASE_URL = f_get_url_base(request);
  const V_RESET_PASSWORD_LINK = `${V_BASE_URL}/user/auth/reset-password/${V_RESET_PASSWORD_TOKEN}`;

  // 6. send an email to the user with the link:

  // set message fields:
  const { messageFields } = f_set_reset_password_mail_template(
    v_get_user_credentials.DATA_FIRSTNAME,
    V_RESET_PASSWORD_LINK
  );

  // send email:
  f_send_transactional_email(
    {
      // eslint-disable-next-line no-undef
      from: process.env.V_EMAIL_SERVER_SENDER,
      to: DATA_EMAIL_ADDRESS,
      subject: messageFields.subject,
      message: messageFields.message,
      html: messageFields.html,
    },
    response
  );

  // the result:
  response
    .status(StatusCodes.CREATED)
    .json(f_set_json_response(Message_ResetPasswordLinkSent));
});

export default f_control_forget_password;
