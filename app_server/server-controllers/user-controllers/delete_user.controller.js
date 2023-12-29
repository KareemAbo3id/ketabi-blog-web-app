/* eslint-disable no-undef */
import asyncHandler from "express-async-handler";
import User_Model from "../../server-data-modeling/user-models/User_Model.model";
import destroyJwtAndRemoveHttpCookie from "../../server-utilities/jwt/destroyJwtToken.utility";

/**
 * Delete User
 *
 * delete user from db and kill the logged-in http cookies.
 * @endpoint "/u/auth/checkpoint/delete-account"
 * @method DELETE
 * @access private
 */

const delete_user = asyncHandler(async (req, res) => {
    // get the password from client request:
    const { password } = req.body;

    // get the user credentials from DB:
    const userCredentials = await User_Model.findOne({ password });

    // DELETE USER FROM DB:
    // check if user credentials are true (retrieved) and compare submitted password:
    if (userCredentials && (await userCredentials.compareSubmittedPasswordWithDB(password))) {
        // generate JWT and save it in http-cookie:
        destroyJwtAndRemoveHttpCookie(process.env.JWT_NAME, res);

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

export default delete_user;
