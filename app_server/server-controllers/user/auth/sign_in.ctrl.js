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
} from "../../../server-helpers/server_validation.js";

/**
 * ### Sign In or Auth User By Credentials - Control
 * Sign the user in and get token to save it in http-only cookie.
 * @link /user/auth/sign-in
 * @method POST
 * @access public
 */
const f_control_sign_in = asyncHandler(async (request, response) => {
  //
  // get the params from client request:
  const { DATA_EMAIL_ADDRESS, DATA_PASSWORD } = request.body;

  // get the user credentials from DB:
  const v_db_userCredentials = await Model_UserData.findOne({
    DATA_EMAIL_ADDRESS,
  });

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

  // check if DATA_EMAIL_ADDRESS exists in DB:
  if (
    !f_check_userCredentials(
      await Model_UserData.findOne({ DATA_EMAIL_ADDRESS })
    )
  ) {
    response.status(StatusCodes.NOT_FOUND);
    throw new Error(`User not found, please try another email address`);
  }

  // check if DATA_PASSWORD compared with DB password:
  if (!(await v_db_userCredentials.m_compare_password(DATA_PASSWORD))) {
    response.status(StatusCodes.UNAUTHORIZED);
    throw new Error(`Wrong password, please try again`);
  }

  // AUTHENTICATE USER CREDENTIALS LOGIC:

  if (
    v_db_userCredentials &&
    (await v_db_userCredentials.m_compare_password(DATA_PASSWORD))
  ) {
    // check if user credentials are true (retrieved) and compare submitted password with DB password
    // 1. generate JWT:
    const generatedJWT = f_sign_jwt(v_db_userCredentials);

    // 2. save JWT in http-cookie:
    f_set_httponly_cookie(response, generatedJWT);

    // 3. the result:
    response.status(StatusCodes.OK).json(
      f_set_json_response(
        "user logged in, token generated and saved in cookie",
        {
          _id: v_db_userCredentials._id,
          DATA_USERNAME: v_db_userCredentials.DATA_USERNAME,
          DATA_EMAIL_ADDRESS: v_db_userCredentials.DATA_EMAIL_ADDRESS,
          FLAG_ACCOUNT_ACTIVATED: v_db_userCredentials.FLAG_ACCOUNT_ACTIVATED,
          FLAG_EMAIL_VERFIED: v_db_userCredentials.FLAG_EMAIL_VERFIED,
          token: { value: generatedJWT },
        }
      )
    );
  }

  // if some error occurs:
  else {
    response.status(StatusCodes.UNAUTHORIZED);
    throw new Error(`Wrong email or password, please try again`);
  }
});

export default f_control_sign_in;
