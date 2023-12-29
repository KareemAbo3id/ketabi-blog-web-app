import asyncHandler from "express-async-handler";
import { StatusCodes } from "http-status-codes";
import destroyJwtAndRemoveHttpCookie from "../../server-utilities/jwt/destroyJwtToken.utility.js";

/**
 * Logout User
 *
 * logout the user and delete token with cookies.
 * @endpoint "/u/auth/log-out"
 * @method POST
 * @access public
 */

const logout_user = asyncHandler(async (req, res) => {
    // eslint-disable-next-line no-undef
    destroyJwtAndRemoveHttpCookie(process.env.JWT_NAME, res);
    res.status(StatusCodes.CREATED).json({ msg: "logged out" });
});

export default logout_user;
