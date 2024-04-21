import asyncHandler from "express-async-handler";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import f_delete_httponly_cookie from "../../../server-services/cookies/delete_httponly_cookie.service.js";
import f_set_json_response from "../../../server-helpers/set_json_response.helper.js";
import f_get_server_validation_messages from "../../../server-helpers/server_validation_messages.helper.js";
import Model_UserData from "../../../server-data-models/user_data.model.js";

const { Message_UserLoggedOut, Message_UserNotLoggedIn } =
  f_get_server_validation_messages();

/**
 * ### Controller function for user sign out.
 *
 * @link `/user/auth/sign-out`
 * @method POST
 * @access public
 */
const f_control_sign_out = asyncHandler(async (request, response) => {
  //
  // 1. get the token from http request's cookies:
  let v_stored_jwt = request.cookies.jwt;

  // if there is no token:
  if (!v_stored_jwt) {
    response.status(StatusCodes.UNAUTHORIZED);
    throw new Error(Message_UserNotLoggedIn);
  }

  // 2. verify the token:
  // eslint-disable-next-line no-undef
  const v_decodedUserCredentials = jwt.verify(
    v_stored_jwt,
    // eslint-disable-next-line no-undef
    process.env.V_JWT_SECRET
  );

  // 3. get the username from decoded token:
  request.v_get_user_credentials = await Model_UserData.findById(
    v_decodedUserCredentials._id
  ).select("-DATA_PASSWORD");

  // TEST [server] if no problem with getting user credentials from token that way
  const v_get_user_credentials = request.v_get_user_credentials;

  // 4. delete the http-only cookie:
  f_delete_httponly_cookie(response);

  // the result:
  response
    .status(StatusCodes.CREATED)
    .json(
      f_set_json_response(
        `(@${v_get_user_credentials.DATA_USERNAME}) ${Message_UserLoggedOut}`
      )
    );
});

export default f_control_sign_out;

/**
 * @swagger
 * /user/auth/sign-out:
 *   post:
 *     summary: Sign out the user.
 *     description: Sign out the user, delete the JWT from http-only cookie.
 *     tags:
 *       - User APIs
 *     responses:
 *       "201":
 *         description: "_CREATED_ User logged out successfully, JWT deleted from http-only cookie"
 *       "401":
 *         description: "_UNAUTHORIZED_ User not logged in"
 */
