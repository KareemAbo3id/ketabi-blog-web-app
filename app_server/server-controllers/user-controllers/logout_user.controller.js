import asyncHandler from "express-async-handler";
import { StatusCodes } from "http-status-codes";
import f_destroyJwtAndRemoveHttpCookie from "../../server-utilities/jwt/destroyJwtToken.utility.js";

/**
 * Logout User
 *
 * logout the user and delete token with cookies.
 * @endpoint "/u/auth/log-out"
 * @method POST
 * @access public
 */

const api_f_logoutUser = asyncHandler(async (req, res) => {
    // eslint-disable-next-line no-undef
    f_destroyJwtAndRemoveHttpCookie(process.env.V_JWT_NAME, res);
    res.status(StatusCodes.CREATED).json({ msg: "logged out" });
});

export default api_f_logoutUser;
