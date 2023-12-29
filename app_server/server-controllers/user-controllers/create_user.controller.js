/* eslint-disable no-undef */
import asyncHandler from "express-async-handler";
import User_Model from "../../server-data-modeling/user-models/User_Model.model.js";
import { StatusCodes } from "http-status-codes";
import generateJwtAndSaveInHttpCookie from "../../server-utilities/jwt/generateJwtToken.utility.js";

/**
 * Create User
 *
 * create a new user with credentials and save it in new doc in DB.
 * @endpoint "/u/auth/sign-up"
 * @access public
 * @method POST
 */

const create_user = asyncHandler(async (req, res) => {
    // get the params from client request:
    const {
        firstName,
        lastName,
        username,
        emailAddress,
        password,
        agreementConfirmation,
        // temp:
        isEmailVerfied,
    } = req.body;

    // get the user credentials from DB:
    const userCredentials_email = await User_Model.findOne({ emailAddress });
    const userCredentials_username = await User_Model.findOne({ username });

    // if the entered credentials has been already exists throw an error:
    if (userCredentials_username) {
        res.status(StatusCodes.BAD_REQUEST);
        throw new Error(`The user @${username} is already exists, try again`);
    }

    if (userCredentials_email) {
        res.status(StatusCodes.BAD_REQUEST);
        throw new Error(`The @${emailAddress} is already signed up, try another email`);
    }

    // CREATE NEW USER:
    // if the entered credentials in not exists (new credentials):
    // send user credentials to DB to create a new user:
    const userPayload = await User_Model.create({
        firstName,
        lastName,
        emailAddress,
        username,
        password,
        agreementConfirmation,
        isEmailVerfied,
        isAccountActive,
    });

    // check if new user has been created:
    if (userPayload) {
        // generate JWT and save it in http-cookie:
        generateJwtAndSaveInHttpCookie(process.env.JWT_NAME, res, userPayload);

        // the result:
        res.status(StatusCodes.CREATED).json({
            _id: userPayload._id,
            firstName: userPayload.firstName,
            lastName: userPayload.lastName,
            emailAddress: userPayload.emailAddress,
            username: userPayload.username,
            agreementConfirmation: userPayload.agreementConfirmation,
            isEmailVerfied: userPayload.isEmailVerfied,
            isAccountActive: userPayload.isAccountActive,
        });
    }

    // if some error occurs:
    else {
        res.status(StatusCodes.BAD_REQUEST);
        throw new Error(`Something went wrong, please try again`);
    }
});

export default create_user;
