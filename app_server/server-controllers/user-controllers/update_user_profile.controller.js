import asyncHandler from "express-async-handler";
import { StatusCodes } from "http-status-codes";
import db_model_UserModel from "../../server-data-modeling/user-models/User_Model.model.js";

/**
 * Update User Profile
 *
 * update the authenticated user credentials and post it to DB.
 * @endpoint "/u/update-profile"
 * @method PUT
 * @access private
 */

const api_f_updateUserProfile = asyncHandler(async (req, res) => {
    // get the user credentials from DB:
    const v_db_userCredentials = await db_model_UserModel.findById(req.v_db_userCredentials._id);

    // UPDATE USER DATA:
    // check if user credentials are true (retrieved) and assign submitted user credentials to DB credentials:
    if (v_db_userCredentials) {
        // assign user credentials to existed ones:
        v_db_userCredentials.v_data_firstName =
            req.body.v_data_firstName || v_db_userCredentials.v_data_firstName;

        v_db_userCredentials.v_data_lastName =
            req.body.v_data_lastName || v_db_userCredentials.v_data_lastName;

        v_db_userCredentials.v_data_emailAddress =
            req.body.v_data_emailAddress || v_db_userCredentials.v_data_emailAddress;

        // save the update:
        await v_db_userCredentials.save();

        // the result:
        res.status(StatusCodes.CREATED).json({
            msg: "your account has been updated",
        });
    }

    // if user not found in DB:
    else {
        res.status(StatusCodes.NOT_FOUND);
        throw new Error(`User not found`);
    }
});

export default api_f_updateUserProfile;
