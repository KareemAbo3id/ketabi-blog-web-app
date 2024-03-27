/* eslint-disable no-undef */
// when user forgets password, he/she can request to reset it by providing his/her email address.
// that will happen through 2 endpoints:

// A. **Forget Password Endpoint**:
//   - **URL**: `/user/auth/forget-password`
//  - **METHOD**: `POST`
// - **Request Body**: `{ DATA_EMAIL_ADDRESS }`
// steps:
// 1. check if the email address exists in the database, if not, return an error message.
// 2. if the email address exists, create a token in a variable `V_RESET_PASSWORD_TOKEN`.
// 3. save the `V_RESET_PASSWORD_TOKEN` in the database under the user's email address, called `TEMP_RESET_PASSWORD_TOKEN`.
// 4. set expiry time for the token `V_RESET_PASSWORD_TOKEN` to 1 hour.
// 5. generate a link with the token `V_RESET_PASSWORD_TOKEN` in the URL: `http://localhost:5555/user/auth/reset-password/${RESET_PASSWORD_TOKEN}`.
// 6. send an email to the user with the link.
// 7. the user will click the link and will be redirected to the reset password page (B endpoint).
// END of Forget Password Endpoint

// start code:

// import required modules:
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";
import Model_UserData from "../../../server-data-models/user_data.model.js";
import f_set_json_response from "../../../server-helpers/set_json_response.helper.js";
import f_get_server_validation_messages from "../../../server-helpers/server_validation_messages.helper.js";
import f_set_reset_password_mail_template from "../../../server-templates/reset-password-mail/set_reset_password_mail.temp.js";
import f_send_transactional_email from "../../../server-services/mailing/send_transactional_email.service.js";
import { V_PORT } from "../../../server-configs/set_server_port.cnfg.js";
import {
  f_check_userCredentials,
  f_validate_email_address,
} from "../../../server-helpers/server_validation_funcs.helper.js";

const { Message_EmailNotValid, Message_UserNotFound } =
  f_get_server_validation_messages();

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
  });

  // check if user credentials are true (retrieved):
  if (!f_check_userCredentials(v_db_userCredentials)) {
    response.status(StatusCodes.NOT_FOUND);
    throw new Error(Message_UserNotFound);
  }

  // 3. create a token for reset password:
  const V_RESET_PASSWORD_TOKEN = jwt.sign(
    {
      _id: v_db_userCredentials._id,
      DATA_USERNAME: v_db_userCredentials.DATA_USERNAME,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );

  // 4. save the token in the database:
  v_db_userCredentials.TEMP_RESET_PASSWORD_TOKEN = V_RESET_PASSWORD_TOKEN;

  // set expiry time for the token to 1 hour:
  v_db_userCredentials.TEMP_RESET_PASSWORD_TOKEN_EXPIRES =
    Date.now() + 60 * 60 * 1000;

  // save the update:
  await v_db_userCredentials.save();

  // 5. generate a link with the token in the URL:
  const V_RESET_PASSWORD_LINK = `${request.protocol}://${request.hostname}:${V_PORT}/user/auth/reset-password/:${V_RESET_PASSWORD_TOKEN}`;

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
      failedMessage: `Reset password email failed to send, please try again`,
      succeedMessage: `Reset password email sent successfully`,
    },
    response
  );

  // the result:
  response
    .status(StatusCodes.CREATED)
    .json(
      f_set_json_response("Reset password link sent to your email address.")
    );
});

export default f_control_forget_password;
