/* eslint-disable no-undef */
import fs from "fs";
import { fileURLToPath } from "url";
import path, { dirname } from "path";
import date from "date-and-time";
import f_get_server_validation_messages from "../../server-helpers/server_validation_messages.helper.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const { Message_UpdatePasswordEmailSubject } = f_get_server_validation_messages();

/**
 * ### Get Password Updated Mail Content
 * @param {String} p_recipient_firstName
 * @param {String} p_mainMessage
 * @param {String} p_passwordUpdatedAt
 */
function f_set_password_updated_mail_template(
  p_recipient_firstName,
  p_mainMessage,
  p_passwordUpdatedAt
) {
  let passwordUpdatedAt = date.format(p_passwordUpdatedAt, "YYYY/MM/DD HH:mm:ss");

  const transactional_mail_file = path.join(
    __dirname,
    "../html-templates/transactional_mail.temp.html"
  );

  const transactional_mail_note_file = path.join(
    __dirname,
    "../html-templates/mail_note.temp.html"
  );

  const email_html_template = fs
    .readFileSync(transactional_mail_file, "utf-8")
    .replace(/{%v_temp_firstName%}/g, p_recipient_firstName)
    .replace(/{%v_temp_mainMessage%}/g, p_mainMessage)
    .replace(/{%v_temp_buttonDiv%}/g, "")
    .replace(
      /{%v_temp_mailNote%}/g,
      fs
        .readFileSync(transactional_mail_note_file, "utf-8")
        .replace(
          /{%v_temp_mailNoteText%}/g,
          `** Your password has been updated successfully. Password updated at: ${passwordUpdatedAt}`
        )
    );

  const messageFields = {
    subject: Message_UpdatePasswordEmailSubject,
    html: email_html_template,
  };

  return { messageFields };
}

export default f_set_password_updated_mail_template;
