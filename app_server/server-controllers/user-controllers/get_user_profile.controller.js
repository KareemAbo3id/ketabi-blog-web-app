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

const api_f_getUserProfile = asyncHandler(async (req, res) => {
    // get the params from client request:
    const v_loggedInUserCredentials = {
        _id: req.v_db_userCredentials._id,
        v_data_firstName: req.v_db_userCredentials.v_data_firstName,
        v_data_lastName: req.v_db_userCredentials.v_data_lastName,
        v_data_emailAddress: req.v_db_userCredentials.v_data_emailAddress,
        v_data_username: req.v_db_userCredentials.v_data_username,
        v_data_isEmailVerfied: req.v_db_userCredentials.v_data_isEmailVerfied,
        v_data_isAccountActive: req.v_db_userCredentials.v_data_isAccountActive,
    };

    //TODO: make the logic of retrieving data

    res.status(StatusCodes.CREATED).json({ profile: v_loggedInUserCredentials });
});

export default api_f_getUserProfile;
