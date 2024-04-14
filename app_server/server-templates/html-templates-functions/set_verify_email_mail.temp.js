/* eslint-disable no-undef */
import fs from "fs";
import { fileURLToPath } from "url";
import path, { dirname } from "path";
import f_get_server_validation_messages from "../../server-helpers/server_validation_messages.helper.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const { Message_VerifyEmailAddressEmailRequestSubject } = f_get_server_validation_messages();

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
  const transactional_mail_file = path.join(
    __dirname,
    "../html-templates/transactional_mail.temp.html"
  );

  const transactional_mail_note_file = path.join(
    __dirname,
    "../html-templates/mail_note.temp.html"
  );

  const transactional_mail_button = path.join(__dirname, "../html-templates/action_btn.temp.html");

  const email_html_template = fs
    .readFileSync(transactional_mail_file, "utf-8")
    .replace(/{%v_temp_firstName%}/g, p_recipient_firstName)
    .replace(/{%v_temp_mainMessage%}/g, p_mainMessage)
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
        .replace(/{%v_temp_mailNoteText%}/g, "** Please note that the link will expire in 1 hours.")
    );

  const messageFields = {
    subject: Message_VerifyEmailAddressEmailRequestSubject,
    html: email_html_template,
  };

  return { messageFields };
}

export default f_set_verify_emailaddress_mail_template;
