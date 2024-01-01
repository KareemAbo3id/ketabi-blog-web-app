/* eslint-disable no-undef */
import asyncHandler from "express-async-handler";
import { StatusCodes } from "http-status-codes";
import db_model_UserModel from "../../server-data-modeling/user-models/User_Model.model.js";
import f_generateJwtAndSaveInHttpCookie from "../../server-utilities/jwt/generateJwtToken.utility.js";

/**
 * Create User
 *
 * create a new user with credentials and save it in new doc in DB.
 * @endpoint "/u/auth/sign-up"
 * @access public
 * @method POST
 */

const api_f_createUser = asyncHandler(async (req, res) => {
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
    } = req.body;

    // get the user credentials from DB:
    const v_db_userEmailAddress = await db_model_UserModel.findOne({ v_data_emailAddress });
    const v_db_userUsername = await db_model_UserModel.findOne({ v_data_username });

    // if the entered credentials has been already exists throw an error:
    if (v_db_userUsername) {
        res.status(StatusCodes.BAD_REQUEST);
        throw new Error(`The user @${v_data_username} is already exists, try again`);
    }

    if (v_db_userEmailAddress) {
        res.status(StatusCodes.BAD_REQUEST);
        throw new Error(`The @${v_data_emailAddress} is already signed up, try another email`);
    }

    // CREATE NEW USER:
    // if the entered credentials in not exists (new credentials):
    // send user credentials to DB to create a new user:
    const v_userPayload = await db_model_UserModel.create({
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
        f_generateJwtAndSaveInHttpCookie(process.env.V_JWT_NAME, res, v_userPayload);

        // the result:
        res.status(StatusCodes.CREATED).json({
            data: {
                _id: v_userPayload._id,
                v_data_firstName: v_userPayload.v_data_firstName,
                v_data_lastName: v_userPayload.v_data_lastName,
                v_data_emailAddress: v_userPayload.v_data_emailAddress,
                v_data_username: v_userPayload.v_data_username,
                v_data_isAgreementConfirmed: v_userPayload.v_data_isAgreementConfirmed,
                v_data_isEmailVerfied: v_userPayload.v_data_isEmailVerfied,
                v_data_isAccountActive: v_userPayload.v_data_isAccountActive,
            },
            message: "user account created",
        });
    }

    // if some error occurs:
    else {
        res.status(StatusCodes.BAD_REQUEST);
        throw new Error(`Something went wrong, please try again`);
    }
});

export default api_f_createUser;
