/* eslint-disable no-undef */
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";
import f_get_server_validation_messages from "../../server-helpers/server_validation_messages.helper";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const { Message_VerifyEmailAddressRequest } = f_get_server_validation_messages();

/**
 * ### Get Verify Email Address Mail Template
 * @param {String} p_recipient_firstName
 * @param {String} p_verifyEmailAddressLink
 * @param {String} p_mainMessage
 */
function f_set_verify_emailaddress_mail_template(
  p_recipient_firstName,
  p_verifyEmailAddressLink,
  p_mainMessage
) {
  const email_html_template = fs
    .readFileSync(`${__dirname}/verify_email_mail.temp.html`, "utf-8")
    .replace(/{%v_temp_firstName%}/g, p_recipient_firstName)
    .replace(/{%v_temp_verifyEmailLink%}/g, p_verifyEmailAddressLink)
    .replace(/{%v_temp_mainMessage%}/g, p_mainMessage);
  // Your account has been successfully created, please click the button below to verify your email address.

  const messageFields = {
    subject: Message_VerifyEmailAddressRequest,

    html: email_html_template,
  };

  return { messageFields };
}

export default f_set_verify_emailaddress_mail_template;
