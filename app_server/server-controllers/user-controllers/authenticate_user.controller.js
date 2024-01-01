/* eslint-disable no-undef */
import asyncHandler from "express-async-handler";
import { StatusCodes } from "http-status-codes";
import db_model_UserModel from "../../server-data-modeling/user-models/User_Model.model.js";
import f_generateJwtAndSaveInHttpCookie from "../../server-utilities/jwt/generateJwtToken.utility.js";

/**
 * Authenticate User
 *
 * authenticate the user and get token to save it in http-only cookie.
 * @endpoint "/u/auth/sign-in"
 * @method POST
 * @access public
 */

const api_f_authenticateUser = asyncHandler(async (req, res) => {
    // get the params from client request:
    const { v_data_emailAddress, v_data_password } = req.body;

    // get the user credentials from DB:
    const v_db_userCredentials = await db_model_UserModel.findOne({ v_data_emailAddress });

    // AUTHENTICATE USER:
    // check if user credentials are true (retrieved) and compare submitted password:
    if (
        v_db_userCredentials &&
        (await v_db_userCredentials.m_compareSubmittedPasswordWithDbPassword(v_data_password))
    ) {
        // generate JWT and save it in http-cookie:
        f_generateJwtAndSaveInHttpCookie(process.env.V_JWT_NAME, res, v_db_userCredentials);

        // the result:
        res.status(StatusCodes.CREATED).json({
            data: {
                _id: v_db_userCredentials._id,
                v_data_username: v_db_userCredentials.v_data_username,
            },
            message: "logged in",
        });
    }

    // if some error occurs:
    else {
        res.status(StatusCodes.UNAUTHORIZED);
        throw new Error(`wrong email or password, please try again`);
    }
});

export default api_f_authenticateUser;
