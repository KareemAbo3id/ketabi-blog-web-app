/* eslint-disable no-undef */
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";
import f_get_server_validation_messages from "../../server-helpers/server_validation_messages.helper";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const { Message_UpdatePasswordEmailSubject } = f_get_server_validation_messages();

/**
 * ### Get Password Updated Mail Content
 * @param {String} p_recipient_firstName
 * @param {String} p_mainMessage
 */
function f_set_password_updated_mail_template(p_recipient_firstName, p_mainMessage) {
  const email_html_template = fs
    .readFileSync(`${__dirname}/password_updated_mail.temp.html`, "utf-8")
    .replace(/{%v_temp_firstName%}/g, p_recipient_firstName)
    .replace(/{%v_temp_mainMessage%}/g, p_mainMessage);
  // Your password has been updated successfully.

  const messageFields = {
    subject: Message_UpdatePasswordEmailSubject,
    html: email_html_template,
  };

  return { messageFields };
}

export default f_set_password_updated_mail_template;
