/* eslint-disable no-undef */
import asyncHandler from "express-async-handler";
import User_Model from "../../server-data-modeling/user-models/User_Model.model.js";
import { StatusCodes } from "http-status-codes";
import generateJwtAndSaveInHttpCookie from "../../server-utilities/jwt/generateJwtToken.utility.js";

/**
 * Authenticate User
 *
 * authenticate the user and get token to save it in http-only cookie.
 * @endpoint "/u/auth/sign-in"
 * @method POST
 * @access public
 */

const authenticate_user = asyncHandler(async (req, res) => {
    // get the params from client request:
    const { emailAddress, password } = req.body;

    // get the user credentials from DB:
    const userCredentials = await User_Model.findOne({ emailAddress });

    // AUTHENTICATE USER:
    // check if user credentials are true (retrieved) and compare submitted password:
    if (userCredentials && (await userCredentials.compareSubmittedPasswordWithDB(password))) {
        // generate JWT and save it in http-cookie:
        generateJwtAndSaveInHttpCookie(process.env.JWT_NAME, res, userCredentials);

        // the result:
        res.status(StatusCodes.CREATED).json({
            _id: userCredentials._id,
            firstName: userCredentials.firstName,
            lastName: userCredentials.lastName,
            emailAddress: userCredentials.emailAddress,
            username: userCredentials.username,
            agreementConfirmation: userCredentials.agreementConfirmation,
            isEmailVerfied: userCredentials.isEmailVerfied,
        });
    }

    // if some error occurs:
    else {
        res.status(StatusCodes.UNAUTHORIZED);
        throw new Error(`wrong email or password, please try again`);
    }
});

export default authenticate_user;
