/* eslint-disable no-undef */
import asyncHandler from "express-async-handler";
import { StatusCodes } from "http-status-codes";
import bcrypt from "bcryptjs";
import db_model_UserModel from "../../server-data-modeling/user-models/User_Model.model.js";
import f_destroyJwtAndRemoveHttpCookie from "../../server-utilities/jwt/destroyJwtToken.utility.js";

/**
 * deactivate User
 *
 * deactivate user account and kill the logged-in http cookies.
 * @endpoint "/u/auth/checkpoint/deactivate-account"
 * @method PATCH
 * @access private
 */

const api_f_deactivateUser = asyncHandler(async (req, res) => {
    // get the user credentials from DB:
    const v_db_userCredentials = await db_model_UserModel
        .findById(req.v_db_userCredentials._id)
        .select("+v_data_password");

    const v_isDbPasswordEqualCurrentPassword = await bcrypt.compare(
        req.body.v_data_password,
        v_db_userCredentials.v_data_password
    );

    // DELETE USER FROM DB:
    // check if user credentials are true (retrieved) and compare submitted password:
    if (v_db_userCredentials) {
        //
        // if user assign a new password equals to the original DB password:
        if (v_isDbPasswordEqualCurrentPassword) {
            //
            // toggle user account activation state to false:
            v_db_userCredentials.v_data_isAccountActive = false;

            // destory and re-generate updated JWT and save it in http-cookie:
            f_destroyJwtAndRemoveHttpCookie(process.env.V_JWT_NAME, res);

            // save the update
            // const updatedUserCredentials = await userCredentials.save();
            await v_db_userCredentials.save();

            // the result:
            res.status(StatusCodes.CREATED).json({
                msg: "Your account has been deactivated, logged out",
            });
        }

        // if new passwords do not match:
        else {
            res.status(StatusCodes.BAD_REQUEST);
            throw new Error("please confirm your new password correctly");
        }
    }

    // if wrong userCredentials:
    else {
        res.status(StatusCodes.NOT_FOUND);
        throw new Error("user not found");
    }
});

export default api_f_deactivateUser;
