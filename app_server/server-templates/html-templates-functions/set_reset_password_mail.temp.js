/* eslint-disable no-undef */
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";
import f_get_server_validation_messages from "../../server-helpers/server_validation_messages.helper";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const { Message_ResetPasswordEmailSubject } = f_get_server_validation_messages();

/**
 * ### Get Reset Password Email Content
 * @param {String} p_recipient_firstName
 * @param {String} p_reaetPasswordLink
 * @param {String} p_mainMessage
 */
function f_set_reset_password_mail_template(
  p_recipient_firstName,
  p_reaetPasswordLink,
  p_mainMessage
) {
  const email_html_template = fs
    .readFileSync(`${__dirname}/reset_password_mail.temp.html`, "utf-8")
    .replace(/{%v_temp_firstName%}/g, p_recipient_firstName)
    .replace(/{%v_temp_reaetPasswordLink%}/g, p_reaetPasswordLink)
    .replace(/{%v_temp_mainMessage%}/g, p_mainMessage);
  // You've asked to reset your password. Please click on the link below to enter a new password:

  const messageFields = {
    subject: Message_ResetPasswordEmailSubject,
    html: email_html_template,
  };

  return { messageFields };
}

export default f_set_reset_password_mail_template;
