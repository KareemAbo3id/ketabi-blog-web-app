/* eslint-disable no-undef */
import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import { StatusCodes } from "http-status-codes";
import db_model_UserModel from "../../server-data-modeling/user-models/User_Model.model.js";

/**
 * Update User Password
 *
 * update the authenticated user password and post it to DB.
 * @endpoint "/u/auth/checkpoint/update-password"
 * @method PUT
 * @access private
 */

const api_f_updateUserPassword = asyncHandler(async (req, res, next) => {
    // get the user credentials from DB:
    const v_db_userCredentials = await db_model_UserModel
        .findById(req.v_db_userCredentials._id)
        .select("+v_data_password");

    const v_isDbPasswordEqualCurrentPassword = await bcrypt.compare(
        req.body.v_data_password,
        v_db_userCredentials.v_data_password
    );

    // UPDATE USER PASSWORD:
    // check if user credentials are true (retrieved) and assign submitted user new password to DB password:
    if (v_db_userCredentials) {
        //
        // if user assign a new password equals to the original DB password:
        if (v_isDbPasswordEqualCurrentPassword) {
            //
            // check if newPassword is equal to confirmed  new password:
            if (req.body.v_data_newPassword === req.body.v_data_confirmNewPassword) {
                //
                // if user assign a new password equals to the original DB password:
                if (req.body.v_data_password !== req.body.v_data_newPassword) {
                    //
                    // assign user new password to existed one:
                    v_db_userCredentials.v_data_password = req.body.v_data_newPassword;

                    // save the update
                    // const updatedUserCredentials = await userCredentials.save();
                    await v_db_userCredentials.save();

                    // the result:
                    res.status(StatusCodes.CREATED).json({
                        msg: "password has been updated",
                    });
                }

                // if new password match original:
                else {
                    res.status(StatusCodes.BAD_REQUEST);
                    throw new Error("You cannot asign your same password, please try again");
                }
            }
            // if new passwords do not match:
            else {
                res.status(StatusCodes.BAD_REQUEST);
                throw new Error("please confirm your new password correctly");
            }
        }

        // if user not found in DB:
        else {
            res.status(StatusCodes.NOT_FOUND);
            throw new Error("your original password is wrong, type your correct password");
        }
    }

    // if wrong userCredentials:
    else {
        res.status(StatusCodes.NOT_FOUND);
        throw new Error("user not found");
    }

    next();
});

export default api_f_updateUserPassword;
