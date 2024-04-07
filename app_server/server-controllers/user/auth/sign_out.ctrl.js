import asyncHandler from "express-async-handler";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import f_delete_httponly_cookie from "../../../server-services/cookies/delete_httponly_cookie.service.js";
import f_set_json_response from "../../../server-helpers/set_json_response.helper.js";
import f_get_server_validation_messages from "../../../server-helpers/server_validation_messages.helper.js";
import Model_UserData from "../../../server-data-models/user_data.model.js";

const { Message_UserLoggedOut } = f_get_server_validation_messages();

/**
 * ### Sign Out User By Deleting JWT - Control
 * @link /user/auth/sign-out
 * @method POST
 * @access public
 */
const f_control_sign_out = asyncHandler(async (request, response) => {
  //
  // get the token from http request's cookies:
  let v_token = request.cookies.jwt;

  // if there is no token:
  if (!v_token) {
    response.status(StatusCodes.UNAUTHORIZED);
    throw new Error("user is not logged in");
  }

  // eslint-disable-next-line no-undef
  const v_decodedUserCredentials = jwt.verify(v_token, process.env.V_JWT_SECRET);

  // get the username from decoded token:
  request.v_db_userCredentials = await Model_UserData.findById(v_decodedUserCredentials._id).select(
    "-DATA_PASSWORD"
  );

  // delete the http-only cookie:
  f_delete_httponly_cookie(response);

  // the result:
  response
    .status(StatusCodes.CREATED)
    .json(
      f_set_json_response(
        `(@${request.v_db_userCredentials.DATA_USERNAME}) ${Message_UserLoggedOut}`
      )
    );
});

export default f_control_sign_out; // done.
