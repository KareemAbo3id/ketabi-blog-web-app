/* eslint-disable no-undef */
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";
import Model_UserData from "../../../server-data-models/user_data.model.js";
import f_set_json_response from "../../../server-helpers/set_json_response.helper.js";
import f_get_server_validation_messages from "../../../server-helpers/server_validation_messages.helper.js";
import f_set_reset_password_mail_template from "../../../server-templates/html-templates-functions/set_reset_password_mail.temp.js";
import f_send_transactional_email from "../../../server-services/mailing/send_transactional_email.service.js";
import f_get_url_base from "../../../server-helpers/get_base_url.helper.js";
import {
  f_check_userCredentials,
  f_validate_email_address,
} from "../../../server-helpers/server_validation_funcs.helper.js";

const {
  Message_EmailNotValid,
  Message_UserNotFound,
  Message_ResetPasswordLinkSent,
  Message_TransactionalEmailFailed,
  Message_TransactionalEmailSuccess,
} = f_get_server_validation_messages();

/**
 * ### Forget Password - Control
 * Send a reset password link to the user's email address.
 * @endpoint /user/auth/forget-password
 * @method POST
 * @access public
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
  const v_db_userCredentials = await Model_UserData.findOne({
    DATA_EMAIL_ADDRESS,
  }).select("-DATA_PASSWORD");

  // check if user credentials are true (retrieved):
  if (!f_check_userCredentials(v_db_userCredentials)) {
    response.status(StatusCodes.NOT_FOUND);
    throw new Error(Message_UserNotFound);
  }

  // 3. create a token for reset password:
  const V_RESET_PASSWORD_TOKEN = jwt.sign(
    {
      _id: v_db_userCredentials._id,
    },
    process.env.V_JWT_SECRET,
    {
      expiresIn: "90d",
    }
  );

  // 4. save the token in the database:
  v_db_userCredentials.TEMP_RESET_PASSWORD_TOKEN = V_RESET_PASSWORD_TOKEN;

  // set expiry time for the token to 1 hour:
  v_db_userCredentials.TEMP_RESET_PASSWORD_TOKEN_EXPIRES = Date.now() + 60 * 60 * 1000; // 1 hour

  // save the update:
  await v_db_userCredentials.save();

  // 5. generate a link with the token in the URL:
  const V_BASE_URL = f_get_url_base(request);
  const V_RESET_PASSWORD_LINK = `${V_BASE_URL}/user/auth/reset-password/${V_RESET_PASSWORD_TOKEN}`;

  // 6. send an email to the user with the link:

  // set message fields:
  const { messageFields } = f_set_reset_password_mail_template(
    v_db_userCredentials.DATA_FIRSTNAME,
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
    {
      failedMessage: Message_TransactionalEmailFailed,
      succeedMessage: Message_TransactionalEmailSuccess,
    },
    response
  );

  // the result:
  response.status(StatusCodes.CREATED).json(f_set_json_response(Message_ResetPasswordLinkSent));
});

export default f_control_forget_password;
