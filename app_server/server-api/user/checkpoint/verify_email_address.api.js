import asyncHandler from "express-async-handler";
import F_JSON_RESPONSE from "../../../server-utilities/json_response.util.js";

/**
 * ### Verify User Email Address API
 * Send a verification link with user _id and token.
 * @endpoint /user/checkpoint/verify-email-address/:uid
 * @method POST
 * @access private
 */
const F_API_VERIFY_EMAIL_ADDRESS = asyncHandler(async (request, response) => {
    response
        .status(200)
        .json(F_JSON_RESPONSE("user email address has been verified", []));
});

export default F_API_VERIFY_EMAIL_ADDRESS;
