import asyncHandler from "express-async-handler";
import { StatusCodes } from "http-status-codes";
import f_send_transactional_email from "../../../server-services/mailing/send_transactional_email.service.js";
import f_set_reset_password_mail_template from "../../../server-templates/reset-password-mail/set_reset_password_mail.temp.js";
import { f_check_userCredentials } from "../../../server-helpers/server_validation.js";
import Model_UserData from "../../../server-data-models/user_data.model.js";
import { V_PORT } from "../../../server-configs/set_server_port.cnfg.js";

/**
 * ### Forget Password - Control
 * Send reset password link to user email address.
 * @endpoint /user/auth/forget-password
 * @method POST
 * @access public
 */
const f_control_forget_password = asyncHandler(async (request, response) => {
  //
  // get the params from client request:
  const { DATA_EMAIL_ADDRESS } = request.body;

  // get the user credentials from DB:
  const v_db_userCredentials = await Model_UserData.findOne({
    DATA_EMAIL_ADDRESS,
  });

  // check if DATA_EMAIL_ADDRESS exists in DB:
  if (
    !f_check_userCredentials(
      await Model_UserData.findOne({ DATA_EMAIL_ADDRESS })
    )
  ) {
    response.status(StatusCodes.CONFLICT);
    throw new Error(
      "This email address does not exist in our database, please try again"
    );
  }

  // RESET PASSWORD LOGIC:
  // check if user credentials are true (retrieved) and set user token and id to pass in reset link:
  if (v_db_userCredentials) {
    // define user id, to generate reset password link:
    const v_userId = v_db_userCredentials._id;
    const v_resetPasswordLink = `http://localhost:${V_PORT}/user/auth/reset-password/${v_userId}`;

    // set message fields:
    const { messageFields } = f_set_reset_password_mail_template(
      v_db_userCredentials.DATA_FIRSTNAME,
      v_resetPasswordLink
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
  }

  // if user credentials are not true (not retrieved):
  else {
    response.status(StatusCodes.UNAUTHORIZED);
    throw new Error(`User not found, please try another email address`);
  }
});

export default f_control_forget_password;
