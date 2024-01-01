/* eslint-disable no-undef */
import asyncHandler from "express-async-handler";
import { StatusCodes } from "http-status-codes";
import db_model_UserModel from "../../server-data-modeling/user-models/User_Model.model.js";

/**
 * reactivate User
 *
 * reactivate user account and after logg-in.
 * @endpoint "/u/auth/checkpoint/reactivate-account"
 * @method PATCH
 * @access private
 */

const api_f_reactivateUser = asyncHandler(async (req, res) => {
    // get the user credentials from DB:
    const v_db_userCredentials = await db_model_UserModel.findById(req.v_db_userCredentials._id);

    // REACTIVATE USER FROM DB:
    if (v_db_userCredentials) {
        //
        // toggle user account activation state to true:
        v_db_userCredentials.v_data_isAccountActive = true;

        // save the update
        // const updatedUserCredentials = await userCredentials.save();
        await v_db_userCredentials.save();

        // the result:
        res.status(StatusCodes.CREATED).json({
            msg: "Your account has been re-activated, welcome back",
        });
    }

    // if wrong userCredentials:
    else {
        res.status(StatusCodes.NOT_FOUND);
        throw new Error("user not found");
    }
});

export default api_f_reactivateUser;
