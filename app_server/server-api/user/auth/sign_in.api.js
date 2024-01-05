/* eslint-disable no-undef */
import asyncHandler from "express-async-handler";
import HTTP_STATUS_CODES from "../../../server-utilities/status_codes.util.js";
import MON_MODEL_USER from "../../../server-data-modeling/user-models/User_Model.model.js";
import F_JSON_RESPONSE from "../../../server-utilities/json_response.util.js";
import F_SET_JWT from "../../../server-utilities/jwt/set_jwt.util.js";

/**
 * ### Sign In or Auth User By Credentials API
 * Sign the user in and get token to save it in http-only cookie.
 * @link /user/auth/sign-in
 * @method POST
 * @access public
 */
const F_API_SIGN_IN = asyncHandler(async (request, response) => {
    // get the params from client request:
    const { v_data_emailAddress, v_data_password } = request.body;

    // get the user credentials from DB:
    const v_db_userCredentials = await MON_MODEL_USER.findOne({
        v_data_emailAddress,
    });

    // AUTHENTICATE USER:
    // check if user credentials are true (retrieved) and compare submitted password with DB password:
    if (
        v_db_userCredentials &&
        (await v_db_userCredentials.M_IS_PASSWORD_MATCH_WITH(v_data_password))
    ) {
        // if user account is active:
        if (v_db_userCredentials.v_data_isAccountActive === true) {
            // generate JWT and save it in http-cookie:
            F_SET_JWT(response, v_db_userCredentials);

            // the result:
            response.status(HTTP_STATUS_CODES.CREATED).json(
                F_JSON_RESPONSE("user logged in, token generated", [
                    {
                        _id: v_db_userCredentials._id,
                        v_data_username: v_db_userCredentials.v_data_username,
                    },
                ])
            );
        }

        // if user account is deactive:
        else {
            response.status(HTTP_STATUS_CODES.UNAUTHORIZED);
            throw new Error(`user @${v_db_userCredentials.v_data_username} is deactivated`);
        }
    }

    // if some error occurs:
    else {
        response.status(HTTP_STATUS_CODES.UNAUTHORIZED);
        throw new Error(`wrong email or password, please try again`);
    }
});

export default F_API_SIGN_IN;
