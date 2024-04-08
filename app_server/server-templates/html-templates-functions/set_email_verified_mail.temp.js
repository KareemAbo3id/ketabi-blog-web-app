/* eslint-disable no-undef */
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";
import f_get_server_validation_messages from "../../server-helpers/server_validation_messages.helper.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const { Message_EmailVerifiedEmailSubject } = f_get_server_validation_messages();

/**
 * ### Get Email Verified Mail Content
 * @param {String} p_recipient_firstName
 * @param {String} p_mainMessage
 */
function f_set_email_verified_mail_template(p_recipient_firstName, p_mainMessage) {
  const transactional_mail_file = path.join(
    __dirname,
    "../html-templates/transactional_mail.temp.html"
  );

  const email_html_template = fs
    .readFileSync(transactional_mail_file, "utf-8")
    .replace(/{%v_temp_firstName%}/g, p_recipient_firstName)
    .replace(/{%v_temp_mainMessage%}/g, p_mainMessage);
  // We are happy to inform you that your email has been verified successfully.

  const messageFields = {
    subject: Message_EmailVerifiedEmailSubject,
    html: email_html_template,
  };

  return { messageFields };
}

export default f_set_email_verified_mail_template;
