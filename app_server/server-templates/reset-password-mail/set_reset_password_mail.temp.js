/* eslint-disable no-undef */
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * ### Get Reset Password Email Content
 * @param {String} p_recipient_firstName
 * @param {String} p_reaetPasswordLink
 */
function f_set_reset_password_mail_template(
  p_recipient_firstName,
  p_reaetPasswordLink
) {
  const email_html_template = fs
    .readFileSync(`${__dirname}/reset_password_mail.temp.html`, "utf-8")
    .replace(/{%v_temp_firstName%}/g, p_recipient_firstName)
    .replace(/{%v_temp_reaetPasswordLink%}/g, p_reaetPasswordLink);

  const messageFields = {
    subject: "Password reset request - Ketabi app",
    html: email_html_template,
  };

  return { messageFields };
}

export default f_set_reset_password_mail_template;
