import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";
import Model_User from "../../../server-data-models/user_data.model.js";
import f_set_httponly_cookie from "../../../server-services/cookies/set_httponly_cookie.service.js";
import f_utl_json_response from "../../../server-helpers/set_json_response.helper.js";
import f_get_server_validation_messages from "../../../server-helpers/server_validation_messages.helper.js";
import f_set_verify_emailaddress_mail_template from "../../../server-templates/mail-templates-setters/action/set_verify_email_mail.temp.js";
import f_send_transactional_email from "../../../server-services/mailing/send_transactional_email.service.js";
import f_utl_url_base from "../../../server-helpers/get_base_url.helper.js";
import {
  f_check_userCredentials,
  f_validate_email_address,
  f_validate_password,
  f_validate_username,
} from "../../../server-helpers/server_validation_funcs.helper.js";

const {
  Message_EmailNotValid,
  Message_PasswordNotValid,
  Message_UsernameNotValid,
  Message_EmailExists,
  Message_UsernameExists,
  Message_PasswordsNotMatch,
  Message_UserCreated,
  Message_InternalServerError,
} = f_get_server_validation_messages();

/**
 * ### Handles the sign-up process for a user.
 *
 * @link `/user/auth/sign-up`
 * @method POST
 * @access public
 */
const f_control_sign_up = asyncHandler(async (request, response) => {
  //
  // 1. get the user credentials from request body:
  const {
    DATA_EMAIL_ADDRESS,
    DATA_USERNAME,
    DATA_PASSWORD,
    DATA_PASSWORD_CONFIRM,
    DATA_FIRSTNAME,
    DATA_LASTNAME,
    FLAG_AGREEMENT_CONFIRMED,
  } = request.body;

  // 2. SERVER VALIDATION:

  // check email conditions:
  if (f_validate_email_address(DATA_EMAIL_ADDRESS)) {
    response.status(StatusCodes.BAD_REQUEST);
    throw new Error(Message_EmailNotValid);
  }

  // check username conditions:
  if (f_validate_password(DATA_PASSWORD)) {
    response.status(StatusCodes.BAD_REQUEST);
    throw new Error(Message_PasswordNotValid);
  }

  // check password conditions:
  if (f_validate_username(DATA_USERNAME)) {
    response.status(StatusCodes.BAD_REQUEST);
    throw new Error(Message_UsernameNotValid);
  }

  // check if DATA_PASSWORD and DATA_PASSWORD_CONFIRM are equal:
  if (DATA_PASSWORD !== DATA_PASSWORD_CONFIRM) {
    response.status(StatusCodes.BAD_REQUEST);
    throw new Error(Message_PasswordsNotMatch);
  }

  // find user credentials in DB, by email:
  const v_get_user_credentials_email = await Model_User.findOne({
    DATA_EMAIL_ADDRESS,
  });

  // find user credentials in DB, by username:
  const v_get_user_credentials_username = await Model_User.findOne({
    DATA_USERNAME,
  });

  // check if user credentials are true (retrieved), by email:
  if (f_check_userCredentials(v_get_user_credentials_email)) {
    response.status(StatusCodes.CONFLICT);
    throw new Error(Message_EmailExists);
  }

  // check if user credentials are true (retrieved), by username:
  if (f_check_userCredentials(v_get_user_credentials_username)) {
    response.status(StatusCodes.CONFLICT);
    throw new Error(Message_UsernameExists);
  }

  // 3. CREATE NEW USER:
  //  check if user credentials are unique and valid, then create new user:

  // create new user payload:
  const v_newUserPayload = await Model_User.create({
    DATA_EMAIL_ADDRESS,
    DATA_USERNAME,
    DATA_PASSWORD,
    DATA_FIRSTNAME,
    DATA_LASTNAME,
    FLAG_AGREEMENT_CONFIRMED,
  });

  // check if new user has been created:
  if (await v_newUserPayload) {
    //
    // generate JWT make it wait for the user to be created:
    const v_generated_jwt = jwt.sign(
      {
        _id: v_newUserPayload._id,
      },
      // eslint-disable-next-line no-undef
      process.env.V_JWT_SECRET,
      {
        expiresIn: "90d",
      }
    );

    // save JWT in http-cookie:
    f_set_httponly_cookie(response, v_generated_jwt);

    // 4. send welcome email to the new user, and a link to verify the email:

    // set verification link:
    const V_BASE_URL = f_utl_url_base(request);
    const V_VERIFICATION_LINK = `${V_BASE_URL}/user/checkpoint/verify-email-address/${v_newUserPayload._id}`;

    // set message fields:
    const { messageFields } = f_set_verify_emailaddress_mail_template(
      v_newUserPayload.DATA_FIRSTNAME,
      V_VERIFICATION_LINK
    );

    // send email to the new user:
    f_send_transactional_email(
      {
        // eslint-disable-next-line no-undef
        from: process.env.V_EMAIL_SERVER_SENDER,
        to: DATA_EMAIL_ADDRESS,
        subject: messageFields.subject,
        message: messageFields.message,
        html: messageFields.html,
      },
      response
    );

    // the result:
    response.status(StatusCodes.CREATED).json(
      f_utl_json_response(Message_UserCreated, {
        userCredentials:
          v_newUserPayload.m_get_user_credentials_without_password(),
      })
    );
  }

  // if some error occurs:
  else {
    response.status(StatusCodes.INTERNAL_SERVER_ERROR);
    throw new Error(Message_InternalServerError);
  }
});

export default f_control_sign_up;

/**
 * @swagger
 * /user/auth/sign-up:
 *   post:
 *     summary: Create a new user account.
 *     description: Take user credentials payload object, validate it, create a new user, and send a welcome email.
 *     tags:
 *       - User APIs
 *     requestBody:
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             required:
 *               - DATA_EMAIL_ADDRESS
 *               - DATA_USERNAME
 *               - DATA_FIRSTNAME
 *               - DATA_LASTNAME
 *               - DATA_PASSWORD
 *               - DATA_PASSWORD_CONFIRM
 *               - FLAG_AGREEMENT_CONFIRMED
 *             properties:
 *               DATA_EMAIL_ADDRESS:
 *                 description: "User email address: validation: accepted email format: user@domain.com"
 *                 type: string
 *                 example: "jhonduo@mail.com"
 *               DATA_USERNAME:
 *                 description: "User username: validation: accepted username format: 'a-z', 'A-Z', '0-9', '_', '-', '.'"
 *                 type: string
 *                 example: "jhon_duo"
 *               DATA_FIRSTNAME:
 *                 description: "User first name"
 *                 type: string
 *                 example: "Jhon"
 *               DATA_LASTNAME:
 *                 description: "User last name"
 *                 type: string
 *                 example: "Duo"
 *               DATA_PASSWORD:
 *                 description: "User password: validation: at least 6 characters, at least 1 uppercase, 1 lowercase, 1 number, 1 special character"
 *                 type: string
 *                 example: "123456"
 *               DATA_PASSWORD_CONFIRM:
 *                 description: "User password confirmation: validation: must match 'DATA_PASSWORD' field"
 *                 type: string
 *                 example: "123456"
 *               FLAG_AGREEMENT_CONFIRMED:
 *                 description: User agreement confirmed
 *                 type: boolean
 *                 example: true
 *     responses:
 *       "201":
 *         description: "_CREATED_ User created, saved in MongoDB model and JWT saved in http-only cookie."
 *         headers:
 *           Set-Cookie:
 *             description: "_EXAMPLE_: jwt=a3fWa71f8dfv4bhgf5; Expires=Thu, 21 Oct 2021 07:28:00 GMT; Secure; HttpOnly"
 *             schema:
 *               type: string
 *               required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: integer
 *                   format: ObjectID
 *                   description: The user ID
 *                   example: 5f7f1f6b46b4f00f9c8b4b2b
 *                 DATA_EMAIL_ADDRESS:
 *                   type: string
 *                   example: foo@bar.com
 *                 DATA_USERNAME:
 *                   type: string
 *                   example: foo_bar
 *                 DATA_PASSWORD:
 *                   type: string
 *                   example: 07dbb6e6832da0841dd79701200e4b179f1a94a7b3dd26f612817f3c03117434
 *                 DATA_FIRSTNAME:
 *                   type: string
 *                   example: John
 *                 DATA_LASTNAME:
 *                   type: string
 *                   example: Doe
 *                 DATA_ADDRESS:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       COUNTRY:
 *                         type: string
 *                         example: Palestine
 *                       CITY:
 *                         type: string
 *                         example: Gaza
 *                 FLAG_AGREEMENT_CONFIRMED:
 *                   type: boolean
 *                   example: true
 *                 FLAG_EMAIL_VERFIED:
 *                   type: boolean
 *                   example: false
 *                 FLAG_ACCOUNT_ACTIVATED:
 *                   type: boolean
 *                   example: true
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   example: 2020-10-08T17:00:00.000Z
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   example: 2020-10-08T17:00:00.000Z
 *       "400":
 *         description: "_BAD_REQUEST_ Invalid input: email not valid, password not valid, username not valid, or passwords not match"
 *       "409":
 *         description: "_CONFLICT_ Email or username already exists"
 *       "500":
 *         description: "_INTERNAL_SERVER_ERROR_ Some error occurred while creating the user"
 */
