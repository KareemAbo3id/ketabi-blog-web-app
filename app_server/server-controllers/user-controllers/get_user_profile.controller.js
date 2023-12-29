import asyncHandler from "express-async-handler";
import { StatusCodes } from "http-status-codes";

/**
 * Get User Profile
 *
 * get the authenticated user credentials.
 * @endpoint "/u/profile/<uid>"
 * @method GET
 * @access private
 */

const get_user_profile = asyncHandler(async (req, res) => {
    // get the params from client request:
    const loggedInUserCredentials = {
        _id: req.userCredentials._id,
        firstName: req.userCredentials.firstName,
        lastName: req.userCredentials.lastName,
        emailAddress: req.userCredentials.emailAddress,
        username: req.userCredentials.username,
        isEmailVerfied: req.userCredentials.isEmailVerfied,
    };

    //TODO: make the logic of retrieving data

    res.status(StatusCodes.CREATED).json({ profile: loggedInUserCredentials });
});

export default get_user_profile;
