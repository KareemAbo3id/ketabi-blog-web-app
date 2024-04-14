import fs from "fs";
import { fileURLToPath } from "url";
import path, { dirname } from "path";
import date from "date-and-time";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import f_get_server_validation_messages from "../../../server-helpers/server_validation_messages.helper.js";

const {
  Message_UpdatedPasswordSubject,
  Message_UpdatedPasswordMain,
  Message_UpdatedPasswordNote,
} = f_get_server_validation_messages();

/**
 * ### Generates the email template for notifying the recipient about a password update.
 *
 * @param {string} p_recipient_firstName - The first name of the recipient.
 * @param {Date} p_passwordUpdatedAt - The date and time when the password was last updated.
 * @returns {Object} An object containing the message fields for the email template.
 */
function f_set_password_updated_mail_template(
  p_recipient_firstName,
  p_passwordUpdatedAt
) {
  //
  // format the password update date:
  let passwordUpdatedAt = date.format(
    p_passwordUpdatedAt,
    "YYYY/MM/DD HH:mm:ss"
  );

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
    .replace(/{%v_temp_mainMessage%}/g, Message_UpdatedPasswordMain)
    .replace(/{%v_temp_buttonDiv%}/g, undefined)
    .replace(
      /{%v_temp_mailNote%}/g,
      fs
        .readFileSync(transactional_mail_note_file, "utf-8")
        .replace(
          /{%v_temp_mailNoteText%}/g,
          Message_UpdatedPasswordNote(passwordUpdatedAt)
        )
    );

  // set the message fields:
  const messageFields = {
    subject: Message_UpdatedPasswordSubject,
    html: email_html_template,
  };

  return { messageFields };
}

export default f_set_password_updated_mail_template;
