/* eslint-disable no-undef */
import nodemailer from "nodemailer";
import { StatusCodes } from "http-status-codes";
import f_set_json_response from "../../server-helpers/set_json_response.helper.js";

/**
 * ### Ready-to-use transactional mailing function depende on `nodemailer` with SMTP Protocol, to send emails
 * @param {Object} p_mailFields `{from, to, subject, message, html}`
 * @param {Object} p_mailCallback `{failedMsg, succeedMsg}` _development mode only_
 * @param {Object} p_response
 * ```
 * F_SEND_TRANSACTIONAL_EMAIL(
 *   { from: "emailAddress", to: "emailAddress", subject: "mail subject", message: "mail message" },
 * );
 * ```
 */
function f_send_transactional_email(p_mailFields, p_mailCallback, p_response) {
  // set transporter:
  const transporter = nodemailer.createTransport({
    host: process.env.V_EMAIL_SERVER_HOST,
    port: process.env.V_EMAIL_SERVER_PORT,
    auth: {
      user: process.env.V_EMAIL_SERVER_USER,
      pass: process.env.V_EMAIL_SERVER_PASS,
    },
  });

  const message = {
    from: p_mailFields.from || process.env.V_EMAIL_SERVER_SENDER,
    to: p_mailFields.to,
    subject: p_mailFields.subject,
    text: p_mailFields.message,
    html: p_mailFields.html,
  };

  transporter.sendMail(message, (error, info) => {
    if (error) {
      p_response
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json(
          f_set_json_response(p_mailCallback.failedMessage, { error: error })
        );
    }
    //
    else {
      p_response.status(StatusCodes.OK).json(
        f_set_json_response(p_mailCallback.succeedMessage, {
          email_info: info,
        })
      );
    }
  });
}

export default f_send_transactional_email;
