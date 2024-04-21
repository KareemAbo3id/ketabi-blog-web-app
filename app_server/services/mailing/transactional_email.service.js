import nodemailer from "nodemailer";
import { StatusCodes } from "http-status-codes";
import f_set_json_response from "../../server-helpers/set_json_response.helper.js";
import f_get_server_validation_messages from "../../server-helpers/server_validation_messages.helper.js";

const { Message_TransactionalEmailFailed, Message_TransactionalEmailSuccess } =
  f_get_server_validation_messages();

/**
 * ### Ready-to-use transactional mailing function depende on `nodemailer` with SMTP Protocol, to send emails
 * @param {Object} p_mailFields `{from, to, subject, message, html}`
 * @param {Object} p_response the API function response param
 */
function f_send_transactional_email(p_mailFields, p_response) {
  // set transporter:
  const transporter = nodemailer.createTransport({
    // eslint-disable-next-line no-undef
    host: process.env.V_EMAIL_SERVER_HOST,
    // eslint-disable-next-line no-undef
    port: process.env.V_EMAIL_SERVER_PORT,
    auth: {
      // eslint-disable-next-line no-undef
      user: process.env.V_EMAIL_SERVER_USER,
      // eslint-disable-next-line no-undef
      pass: process.env.V_EMAIL_SERVER_PASS,
    },
  });

  // set message:
  const message = {
    // eslint-disable-next-line no-undef
    from: p_mailFields.from || process.env.V_EMAIL_SERVER_SENDER,
    to: p_mailFields.to,
    subject: p_mailFields.subject,
    text: p_mailFields.message,
    html: p_mailFields.html,
  };

  // send mail:
  transporter.sendMail(message, (error, info) => {
    if (error) {
      p_response.status(StatusCodes.INTERNAL_SERVER_ERROR).json(
        f_set_json_response(Message_TransactionalEmailFailed, {
          error: error,
        })
      );
    }
    //
    else {
      p_response.status(StatusCodes.OK).json(
        f_set_json_response(Message_TransactionalEmailSuccess, {
          email_info: info,
        })
      );
    }
  });
}

export default f_send_transactional_email;
