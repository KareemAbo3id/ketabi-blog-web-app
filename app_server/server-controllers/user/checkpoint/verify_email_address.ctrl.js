import asyncHandler from "express-async-handler";
import f_set_json_response from "../../../server-helpers/set_json_response.helper.js";

/**
 * ### Verify User Email Address - Control
 * Send a verification link with user _id and token.
 * @endpoint /user/checkpoint/verify-email-address/:uid
 * @method POST
 * @access private
 */
const f_control_verify_email_address = asyncHandler(
  async (request, response) => {
    response
      .status(200)
      .json(f_set_json_response("user email address has been verified"));
  }
);

export default f_control_verify_email_address;
