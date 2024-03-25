import asyncHandler from "express-async-handler";
import { StatusCodes } from "http-status-codes";
import Model_UserData from "../../../server-data-models/user_data.model.js";
import f_sign_jwt from "../../../server-services/jwt/sign_jwt.service.js";
import f_set_httponly_cookie from "../../../server-services/cookies/set_httponly_cookie.service.js";
import f_set_json_response from "../../../server-helpers/set_json_response.helper.js";
import {
  f_check_userCredentials,
  f_validate_email_address,
  f_validate_password,
  f_validate_username,
} from "../../../server-helpers/server_validation.js";

/**
 * ### Sign Up or Register New User - Control
 * Register a new user and sign the user in.
 * @link /user/auth/sign-up
 * @method POST
 * @access public
 */
const f_control_sign_up = asyncHandler(async (request, response) => {
  //
  // get the params from client request:
  const {
    DATA_EMAIL_ADDRESS,
    DATA_USERNAME,
    DATA_PASSWORD,
    DATA_PASSWORD_CONFIRM,
    DATA_FIRSTNAME,
    DATA_LASTNAME,
    FLAG_AGREEMENT_CONFIRMED,
  } = request.body;

  // check email conditions:
  if (f_validate_email_address(DATA_EMAIL_ADDRESS)) {
    response.status(StatusCodes.BAD_REQUEST);
    throw new Error(`Email address is not valid, please try again`);
  }

  // check password conditions:
  if (f_validate_password(DATA_PASSWORD)) {
    response.status(StatusCodes.BAD_REQUEST);
    throw new Error(
      `Password must be between 8 and 30 characters, and contain at least one lowercase letter, one uppercase letter, and one number`
    );
  }

  // check username conditions:
  if (f_validate_username(DATA_USERNAME)) {
    response.status(StatusCodes.BAD_REQUEST);
    throw new Error(`Username must be between 5 and 255 characters`);
  }

  // check if DATA_PASSWORD and DATA_PASSWORD_CONFIRM are equal:
  if (DATA_PASSWORD !== DATA_PASSWORD_CONFIRM) {
    response.status(StatusCodes.BAD_REQUEST);
    throw new Error(`Passwords do not match, please try again`);
  }

  // check if DATA_EMAIL_ADDRESS exists in DB:
  if (
    f_check_userCredentials(
      await Model_UserData.findOne({ DATA_EMAIL_ADDRESS })
    )
  ) {
    response.status(StatusCodes.CONFLICT);
    throw new Error(
      `Email address already exists, please try another email address`
    );
  }

  // check if DATA_USERNAME exists in DB:
  if (
    f_check_userCredentials(await Model_UserData.findOne({ DATA_USERNAME }))
  ) {
    response.status(StatusCodes.CONFLICT);
    throw new Error(`Username already exists, please try another username`);
  }

  // CREATE USER LOGIC:

  // create new user payload:
  const v_userPayload = await Model_UserData.create({
    DATA_EMAIL_ADDRESS,
    DATA_USERNAME,
    DATA_PASSWORD,
    DATA_FIRSTNAME,
    DATA_LASTNAME,
    FLAG_AGREEMENT_CONFIRMED,
  });

  // check if new user has been created:
  if (v_userPayload) {
    // generate JWT
    const v_generatedJWT = f_sign_jwt(v_userPayload);

    // save JWT in http-cookie:
    f_set_httponly_cookie(response, v_generatedJWT);

    // the result:
    response.status(StatusCodes.CREATED).json(
      f_set_json_response(
        "user signed up, token generated and saved in cookie",
        {
          _id: v_userPayload._id,
          DATA_USERNAME: v_userPayload.DATA_USERNAME,
          DATA_FIRSTNAME: v_userPayload.DATA_FIRSTNAME,
          DATA_LASTNAME: v_userPayload.DATA_LASTNAME,
          DATA_EMAIL_ADDRESS: v_userPayload.DATA_EMAIL_ADDRESS,
          FLAG_ACCOUNT_ACTIVATED: v_userPayload.FLAG_ACCOUNT_ACTIVATED,
          FLAG_EMAIL_VERFIED: v_userPayload.FLAG_EMAIL_VERFIED,
          token: { value: v_generatedJWT },
        }
      )
    );
  } else {
    response.status(StatusCodes.INTERNAL_SERVER_ERROR);
    throw new Error(`Internal server error, please try again`);
  }

  // console.log test:
  console.log(v_userPayload);
});

export default f_control_sign_up;
