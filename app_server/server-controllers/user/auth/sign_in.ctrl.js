/* eslint-disable no-undef */
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";
import Model_UserData from "../../../server-data-models/user_data.model.js";
import f_set_httponly_cookie from "../../../server-services/cookies/set_httponly_cookie.service.js";
import f_set_json_response from "../../../server-helpers/set_json_response.helper.js";
import f_get_server_validation_messages from "../../../server-helpers/server_validation_messages.helper.js";
import {
  f_check_userCredentials,
  f_validate_email_address,
  f_validate_password,
} from "../../../server-helpers/server_validation_funcs.helper.js";

const {
  Message_EmailNotValid,
  Message_PasswordNotValid,
  Message_UserNotFound,
  Message_WrongPassword,
  Message_UserLoggedIn,
  Message_WrongEmailPassword,
} = f_get_server_validation_messages();

/**
 * ### Sign In or Auth User By Credentials - Control
 * Sign the user in and get token to save it in http-only cookie.
 * @link /user/auth/sign-in
 * @method POST
 * @access public
 */
const f_control_sign_in = asyncHandler(async (request, response) => {
  //
  // 1. get the user credentials from request body:
  const { DATA_EMAIL_ADDRESS, DATA_PASSWORD } = request.body;

  // 2. SERVER VALIDATION:

  // check email conditions:
  if (f_validate_email_address(DATA_EMAIL_ADDRESS)) {
    response.status(StatusCodes.BAD_REQUEST);
    throw new Error(Message_EmailNotValid);
  }

  // check password conditions:
  if (f_validate_password(DATA_PASSWORD)) {
    response.status(StatusCodes.BAD_REQUEST);
    throw new Error(Message_PasswordNotValid);
  }

  // find user credentials in DB:
  const v_db_userCredentials = await Model_UserData.findOne({
    DATA_EMAIL_ADDRESS,
  });

  // check if user credentials are true (retrieved):
  if (!f_check_userCredentials(v_db_userCredentials)) {
    response.status(StatusCodes.NOT_FOUND);
    throw new Error(Message_UserNotFound);
  }

  // check if DATA_PASSWORD compared with DB password:
  if (!(await v_db_userCredentials.m_compare_password(DATA_PASSWORD))) {
    response.status(StatusCodes.UNAUTHORIZED);
    throw new Error(Message_WrongPassword);
  }

  // 3. AUTHENTICATE USER CREDENTIALS LOGIC:
  // check if user credentials are true (retrieved) and compare submitted password with DB password

  if (v_db_userCredentials && (await v_db_userCredentials.m_compare_password(DATA_PASSWORD))) {
    //
    // generate JWT:
    const generatedJWT = jwt.sign(
      {
        _id: v_db_userCredentials._id,
      },
      process.env.V_JWT_SECRET,
      {
        expiresIn: "90d",
      }
    );

    // save JWT in http-cookie:
    f_set_httponly_cookie(response, generatedJWT);

    // TODO [BACKEND]: send a notification email to the user that he logged in.

    // the result:
    response.status(StatusCodes.OK).json(
      f_set_json_response(`(@${v_db_userCredentials.DATA_USERNAME}) ${Message_UserLoggedIn}`, {
        userCredentials: v_db_userCredentials.m_get_user_credentials_without_password(),
        token: generatedJWT,
      })
    );
  }

  // if some error occurs:
  else {
    response.status(StatusCodes.UNAUTHORIZED);
    throw new Error(Message_WrongEmailPassword);
  }
});

export default f_control_sign_in; // done.
