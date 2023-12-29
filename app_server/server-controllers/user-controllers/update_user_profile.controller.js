import asyncHandler from "express-async-handler";
import { StatusCodes } from "http-status-codes";
import User_Model from "../../server-data-modeling/user-models/User_Model.model.js";

/**
 * Update User Profile
 *
 * update the authenticated user credentials and post it to DB.
 * @endpoint "/u/update-profile"
 * @method PUT
 * @access private
 */

const update_user_profile = asyncHandler(async (req, res) => {
    // get the user credentials from DB:
    const userCredentials = await User_Model.findById(req.userCredentials._id);

    console.log(userCredentials);

    // UPDATE USER DATA:
    // check if user credentials are true (retrieved) and assign submitted user credentials to DB credentials:
    if (userCredentials) {
        // assign user credentials to existed ones:
        userCredentials.firstName = req.body.firstName || userCredentials.firstName;
        userCredentials.lastName = req.body.lastName || userCredentials.lastName;
        userCredentials.emailAddress = req.body.emailAddress || userCredentials.emailAddress;

        //TODO: make a controller for update password with old pass and new pass with confirm

        // save the update:
        const updatedUserCredentials = await userCredentials.save();

        // the result:
        res.status(StatusCodes.CREATED).json({
            updated: {
                _id: updatedUserCredentials._id,
                firstName: updatedUserCredentials.firstName,
                lastName: updatedUserCredentials.lastName,
                emailAddress: updatedUserCredentials.emailAddress,
            },
        });
    }

    // if user not found in DB:
    else {
        res.status(StatusCodes.NOT_FOUND);
        throw new Error(`User not found`);
    }
});

export default update_user_profile;
