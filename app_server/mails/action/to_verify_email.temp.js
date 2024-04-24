import fs from "fs";
import { fileURLToPath } from "url";
import path, { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import f_get_server_validation_messages from "../../../server-helpers/server_validation_messages.helper.js";

const {
  Message_VerifyEmailRequestSubject,
  Message_VerifyEmailRequestMain,
  Message_SignUpConfirmNote,
} = f_get_server_validation_messages();

/**
 * ### Generates the email template for verifying email address.
 *
 * @param {string} p_recipient_firstName - The first name of the recipient.
 * @param {string} p_verifyEmailAddressLink - The verification link for the email address.
 * @returns {Object} An object containing the message fields for the email.
 */
function f_set_verify_emailaddress_mail_template(
  p_recipient_firstName,
  p_verifyEmailAddressLink
) {
  //
  // get the email template file:
  const transactional_mail_file = path.join(
    __dirname,
    "../../mail-templates-html/transactional_mail.temp.html"
  );

  // get the email button template file:
  const transactional_mail_button = path.join(
    __dirname,
    "../../mail-templates-html/action_btn.temp.html"
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
    .replace(/{%v_temp_mainMessage%}/g, Message_VerifyEmailRequestMain)
    .replace(
      /{%v_temp_buttonDiv%}/g,
      fs
        .readFileSync(transactional_mail_button, "utf-8")
        .replace(/{%v_temp_toSendLink%}/g, p_verifyEmailAddressLink)
        .replace(/{%v_temp_buttonCaption%}/g, "verify your email address")
    )
    .replace(
      /{%v_temp_mailNote%}/g,
      fs
        .readFileSync(transactional_mail_note_file, "utf-8")
        .replace(/{%v_temp_mailNoteText%}/g, Message_SignUpConfirmNote)
    );

  // set the message fields:
  const messageFields = {
    subject: Message_VerifyEmailRequestSubject,
    html: email_html_template,
  };

  return { messageFields };
}

export default f_set_verify_emailaddress_mail_template;
