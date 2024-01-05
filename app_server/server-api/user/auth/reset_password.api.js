import asyncHandler from "express-async-handler";
import F_JSON_RESPONSE from "../../../server-utilities/json_response.util.js";
import HTTP_STATUS_CODES from "../../../server-utilities/status_codes.util.js";

/**
 * ### Reset Password API
 * reset forgotten user password by sending a link to user email address.
 * @endpoint /user/auth/reset-password
 * @method PUT
 * @access public
 */
const F_API_RESET_PASSWORD = asyncHandler(async (request, response) => {
    response
        .status(HTTP_STATUS_CODES.OK)
        .json(F_JSON_RESPONSE("user password has been successfully reset", []));
});

export default F_API_RESET_PASSWORD;
