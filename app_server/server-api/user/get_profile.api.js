import asyncHandler from "express-async-handler";
import HTTP_STATUS_CODES from "../../server-utilities/status_codes.util.js";
import F_JSON_RESPONSE from "../../server-utilities/json_response.util.js";

/**
 * ### Get User Profile API
 * get the authenticated user credentials from request.
 * @link /user/profile/:uid
 * @method GET
 * @access private
 */
const F_API_GET_PROFILE = asyncHandler(async (req, res) => {
    // TODO test the params from req
    // get the params from client request:
    // const v_loggedInUserCredentials = {
    //     _id: req.v_db_userCredentials._id,
    //     v_data_firstName: req.v_db_userCredentials.v_data_firstName,
    //     v_data_lastName: req.v_db_userCredentials.v_data_lastName,
    //     v_data_emailAddress: req.v_db_userCredentials.v_data_emailAddress,
    //     v_data_username: req.v_db_userCredentials.v_data_username,
    //     v_data_isEmailVerfied: req.v_db_userCredentials.v_data_isEmailVerfied,
    //     v_data_isAccountActive: req.v_db_userCredentials.v_data_isAccountActive,
    // };
    const v_loggedInUserCredentials = {
        ...req.v_db_userCredentials,
        v_data_isAccountActive: req.v_db_userCredentials.v_data_isAccountActive,
    };

    // if user account is active:
    if (v_loggedInUserCredentials.v_data_isAccountActive === true) {
        // the result:
        res.status(HTTP_STATUS_CODES.OK).json(
            F_JSON_RESPONSE("user profile has been retrieved", [
                { profile: v_loggedInUserCredentials },
            ])
        );
    }

    // if user account is deactive:
    else {
        res.status(HTTP_STATUS_CODES.UNAUTHORIZED);
        throw new Error(
            `user @${v_loggedInUserCredentials.v_data_username} is deactivated`
        );
    }
});

export default F_API_GET_PROFILE;
