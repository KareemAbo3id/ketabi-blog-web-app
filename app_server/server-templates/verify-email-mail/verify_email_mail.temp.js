/* eslint-disable no-undef */
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * ### Get Verify Email Address Mail Template
 * @param {String} p_recipient_firstName
 * @param {String} p_verifyEmailAddressLink
 */
function f_set_verify_emailaddress_mail_template(
  p_recipient_firstName,
  p_verifyEmailAddressLink
) {
  const email_html_template = fs
    .readFileSync(`${__dirname}/verify_email_mail.temp.html`, "utf-8")
    .replace(/{%v_temp_firstName%}/g, p_recipient_firstName)
    .replace(/{%v_temp_verifyEmailLink%}/g, p_verifyEmailAddressLink);

  const messageFields = {
    subject: "Welcome to Ketabi, Please Verify Your Email Address",
    html: email_html_template,
  };

  return { messageFields };
}

export default f_set_verify_emailaddress_mail_template;
