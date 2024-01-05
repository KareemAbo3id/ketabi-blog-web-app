/* eslint-disable no-undef */
import asyncHandler from "express-async-handler";
import HTTP_STATUS_CODES from "../../../server-utilities/status_codes.util.js";
import MON_MODEL_USER from "../../../server-data-modeling/user-models/User_Model.model.js";
import F_SET_JWT from "../../../server-utilities/jwt/set_jwt.util.js";
import F_JSON_RESPONSE from "../../../server-utilities/json_response.util.js";

/**
 * ### Sign Up New User By Credentials API
 * Create a new user with credentials and save it in new doc in DB.
 * @link /user/auth/sign-up
 * @method POST
 * @access public
 */
const F_API_SIGN_UP = asyncHandler(async (request, response) => {
    // get the params from client request:
    const {
        v_data_firstName,
        v_data_lastName,
        v_data_username,
        v_data_emailAddress,
        v_data_password,
        v_data_isAgreementConfirmed,
        v_data_isEmailVerfied,
        v_data_isAccountActive,
    } = request.body;

    // get the user credentials from DB:
    const v_db_userEmailAddress = await MON_MODEL_USER.findOne({
        v_data_emailAddress,
    });
    const v_db_userUsername = await MON_MODEL_USER.findOne({
        v_data_username,
    });

    // if the entered credentials has been already exists throw an error:
    if (v_db_userUsername) {
        response.status(HTTP_STATUS_CODES.BAD_REQUEST);
        throw new Error(`The user @${v_data_username} is already exists, try again`);
    }

    if (v_db_userEmailAddress) {
        response.status(HTTP_STATUS_CODES.BAD_REQUEST);
        throw new Error(`The @${v_data_emailAddress} is already signed up, try another email`);
    }

    // CREATE NEW USER:
    // if the entered credentials in not exists (new credentials):
    // send user credentials to DB to create a new user:
    const v_userPayload = await MON_MODEL_USER.create({
        v_data_firstName,
        v_data_lastName,
        v_data_emailAddress,
        v_data_username,
        v_data_password,
        v_data_isAgreementConfirmed,
        v_data_isEmailVerfied,
        v_data_isAccountActive,
    });

    // check if new user has been created:
    if (v_userPayload) {
        // generate JWT and save it in http-cookie:
        F_SET_JWT(process.env.V_JWT_NAME, response, v_userPayload);

        // the result:
        response.status(HTTP_STATUS_CODES.CREATED).json(
            F_JSON_RESPONSE("user account has been created and saved in DB, token generated", [
                {
                    _id: v_userPayload._id,
                    v_data_firstName: v_userPayload.v_data_firstName,
                    v_data_lastName: v_userPayload.v_data_lastName,
                    v_data_emailAddress: v_userPayload.v_data_emailAddress,
                    v_data_username: v_userPayload.v_data_username,
                    v_data_isAgreementConfirmed: v_userPayload.v_data_isAgreementConfirmed,
                    v_data_isEmailVerfied: v_userPayload.v_data_isEmailVerfied,
                    v_data_isAccountActive: v_userPayload.v_data_isAccountActive,
                },
            ])
        );
    }

    // if some error occurs:
    else {
        response.status(HTTP_STATUS_CODES.BAD_REQUEST);
        throw new Error(`Something went wrong, please try again`);
    }
});

export default F_API_SIGN_UP;
