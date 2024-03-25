// TODO re-structure the code to be more updated and clean

import asyncHandler from "express-async-handler";
import { StatusCodes } from "http-status-codes";
import f_delete_httponly_cookie from "../../../server-services/cookies/delete_httponly_cookie.service.js";
import f_set_json_response from "../../../server-helpers/set_json_response.helper.js";

/**
 * ### Sign Out User By Deleting JWT - Control
 * @link /user/auth/sign-out
 * @method POST
 * @access public
 */
const f_control_sign_out = asyncHandler(async (request, response) => {
  f_delete_httponly_cookie(response);
  response
    .status(StatusCodes.CREATED)
    .json(f_set_json_response("user has been successfully logged out"));
});

export default f_control_sign_out;
