import asyncHandler from "express-async-handler";

/**
 * Verify User Email
 *
 * verify user email via sending a link to entered email address.
 * @endpoint "/u/auth/checkpoint/verify-email"
 * @method POST
 * @access private
 */

const api_f_verifyUserEmail = asyncHandler(async (req, res) => {
    res.status(200).json({ msg: "verify_user_email test" });
});

export default api_f_verifyUserEmail;
