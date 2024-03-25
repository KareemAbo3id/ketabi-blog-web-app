/* eslint-disable no-undef */
import asyncHandler from "express-async-handler";
import { StatusCodes } from "http-status-codes";
import Model_UserData from "../../../server-data-models/user/user_data.model.js";
import f_sign_jwt from "../../../server-services/jwt/sign_jwt.service.js";
import { V_PORT } from "../../../server-configs/set_server_port.cnfg.js";
import f_send_transactional_email from "../../../server-services/mailing/send_transactional_email.service.js";
import f_set_reset_password_mail_template from "../../../server-templates/reset-password-mail/set_reset_password_mail.temp.js";

/**
 * ### Reset Password - Control
 * Reset forgotten user password by sending a link to user email address.
 * @endpoint /user/auth/reset-password
 * @method PUT
 * @access public
 */
const f_control_reset_password = asyncHandler(async (request, response) => {
  // get the params from client request:
  const { data_emailAddress } = request.body;

  // get the user credentials from DB:
  const v_db_userCredentials = await Model_UserData.findOne({
    data_emailAddress,
  });

  // RESET PASSWORD:
  // check if user credentials are true (retrieved) and set user token and id to pass in reset link:
  if (v_db_userCredentials) {
    const tokenExtension = f_sign_jwt(v_db_userCredentials).replace(/\./g, "");
    const idExtension = v_db_userCredentials._id;
    const reaetPasswordLink = `http://localhost:${V_PORT}/reset-password/${idExtension}/${tokenExtension}`;

    const { messageFields } = f_set_reset_password_mail_template(
      v_db_userCredentials.data_firstName,
      reaetPasswordLink
    );

    // send email:
    f_send_transactional_email(
      {
        from: process.env.V_EMAIL_SERVER_SENDER,
        to: data_emailAddress,
        subject: messageFields.subject,
        html: messageFields.html,
      },
      {
        failedMessage: "Something went wrong, email not sent",
        succeedMessage: "Reset password email has been sent to user",
      },
      response
    );
  }

  // if some error occurs:
  else {
    response.status(StatusCodes.UNAUTHORIZED);
    throw new Error(`The email you entered is not existed, please try again`);
  }
});

export default f_control_reset_password;
