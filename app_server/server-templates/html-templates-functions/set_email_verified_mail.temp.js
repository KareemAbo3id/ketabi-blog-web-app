/* eslint-disable no-undef */
import fs from "fs";
import { fileURLToPath } from "url";
import path, { dirname } from "path";
import date from "date-and-time";
import f_get_server_validation_messages from "../../server-helpers/server_validation_messages.helper.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const { Message_EmailVerifiedEmailSubject } = f_get_server_validation_messages();

/**
 * ### Get Email Verified Mail Content
 * @param {String} p_recipient_firstName
 * @param {String} p_recipient_username
 * @param {String} p_mainMessage
 * @param {String} p_createdAt
 */
function f_set_email_verified_mail_template(
  p_recipient_firstName,
  p_recipient_username,
  p_mainMessage,
  p_createdAt
) {
  let createdAt = date.format(p_createdAt, "YYYY/MM/DD HH:mm:ss");

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
          `** Your account with username: @${p_recipient_username} has been successfully verified. Account created at: ${createdAt}`
        )
    );

  const messageFields = {
    subject: Message_EmailVerifiedEmailSubject,
    html: email_html_template,
  };

  return { messageFields };
}

export default f_set_email_verified_mail_template;
