import fs from "fs";
import { fileURLToPath } from "url";
import path, { dirname } from "path";
import date from "date-and-time";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import f_get_server_validation_messages from "../../../server-helpers/server_validation_messages.helper.js";

const {
  Message_LoggedinConfirmSubject,
  Message_LoggedinConfirmMain,
  Message_LoggedinConfirmNote,
} = f_get_server_validation_messages();

/**
 * ### Sets the logged-in confirmation mail template.
 *
 * @param {string} p_recipient_firstName - The first name of the recipient.
 * @param {string} p_recipient_username - The username of the recipient.
 * @param {Date} p_loggedInAt - The date and time when the recipient logged in.
 * @returns {Object} An object containing the message fields for the logged-in mail template.
 */
function f_set_loggedin_mail_template(
  p_recipient_firstName,
  p_recipient_username,
  p_loggedInAt
) {
  //
  // format the login date:
  let loggedInAt = date.format(p_loggedInAt, "YYYY/MM/DD HH:mm:ss");

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
    .replace(
      /{%v_temp_mainMessage%}/g,
      Message_LoggedinConfirmMain(p_recipient_username, loggedInAt)
    )
    .replace(/{%v_temp_buttonDiv%}/g, "")
    .replace(
      /{%v_temp_mailNote%}/g,
      fs
        .readFileSync(transactional_mail_note_file, "utf-8")
        .replace(/{%v_temp_mailNoteText%}/g, Message_LoggedinConfirmNote)
    );

  // set the message fields:
  const messageFields = {
    subject: Message_LoggedinConfirmSubject,
    html: email_html_template,
  };

  return { messageFields };
}

export default f_set_loggedin_mail_template;
