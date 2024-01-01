import asyncHandler from "express-async-handler";

/**
 * Reset User Password
 *
 * reset forgotten user password.
 * @endpoint "/u/auth/checkpoint/reset-password"
 * @method PUT
 * @access public
 */

const api_f_resetUserPassword = asyncHandler(async (req, res) => {
    res.status(200).json({ msg: "reset_user_password test" });
});

export default api_f_resetUserPassword;
