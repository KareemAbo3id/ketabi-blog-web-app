import asyncHandler from "express-async-handler";
import HTTP_STATUS_CODES from "../../../server-utilities/status_codes.util.js";
import F_API_RESPONSE_JSON from "../../../server-utilities/json_response.util.js";
import F_DEL_JWT from "../../../server-utilities/jwt/del_jwt.util.js";

/**
 * ### Sign Out User By Deleting JWT
 * @link /user/auth/sign-out
 * @method POST
 * @access public
 */
const F_API_SIGN_OUT = asyncHandler(async (request, response) => {
    F_DEL_JWT(response);
    response
        .status(HTTP_STATUS_CODES.CREATED)
        .json(F_API_RESPONSE_JSON("user has been successfully logged out", []));
});

export default F_API_SIGN_OUT;
