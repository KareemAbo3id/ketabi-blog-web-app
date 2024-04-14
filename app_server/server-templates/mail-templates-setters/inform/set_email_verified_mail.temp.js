import fs from "fs";
import { fileURLToPath } from "url";
import path, { dirname } from "path";
import date from "date-and-time";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import f_get_server_validation_messages from "../../../server-helpers/server_validation_messages.helper.js";

const {
  Message_VerifiedEmailSubject,
  Message_VerifiedEmailMain,
  Message_VerifiedEmailNote,
} = f_get_server_validation_messages();

/**
 * ### Generates an email template for notifying the recipient that their email has been verified.
 *
 * @param {string} p_recipient_firstName - The first name of the recipient.
 * @param {string} p_recipient_username - The username of the recipient.
 * @param {Date} p_createdAt - The creation date of the account.
 * @returns {Object} An object containing the message fields for sending the email.
 */
function f_set_email_verified_mail_template(
  p_recipient_firstName,
  p_recipient_username,
  p_createdAt
) {
  //
  // format the creation date:
  let createdAt = date.format(p_createdAt, "YYYY/MM/DD HH:mm:ss");

  // get the email template file:
  const transactional_mail_file = path.join(
    __dirname,
    "../../mail-templates-html/transactional_mail.temp.html"
  );

  // get the email note template file:
  const transactional_mail_note_file = path.join(
    __dirname,
    "../../mail-templates-html/mail_note.temp.html"
  );

  // read the email template file and replace the placeholders with the actual values:
  const email_html_template = fs
    .readFileSync(transactional_mail_file, "utf-8")
    .replace(/{%v_temp_firstName%}/g, p_recipient_firstName)
    .replace(/{%v_temp_mainMessage%}/g, Message_VerifiedEmailMain)
    .replace(/{%v_temp_buttonDiv%}/g, undefined)
    .replace(
      /{%v_temp_mailNote%}/g,
      fs
        .readFileSync(transactional_mail_note_file, "utf-8")
        .replace(
          /{%v_temp_mailNoteText%}/g,
          Message_VerifiedEmailNote(p_recipient_username, createdAt)
        )
    );

  // set the message fields:
  const messageFields = {
    subject: Message_VerifiedEmailSubject,
    html: email_html_template,
  };

  return { messageFields };
}

export default f_set_email_verified_mail_template;
