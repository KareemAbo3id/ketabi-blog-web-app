import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import HTTP_STATUS_CODES from "../../server-utilities/status_codes.util.js";
import MON_MODEL_USER from "../../server-data-modeling/user-models/User_Model.model.js";
import F_JSON_RESPONSE from "../../server-utilities/json_response.util.js";

/**
 * ### Update User Password API
 * Update the authenticated user password and save it to DB.
 * @link /user/update-password/:uid
 * @method PUT
 * @access private
 */
const F_API_UPDATE_PASSWORD = asyncHandler(async (req, res, next) => {
    // get the user credentials from DB:
    const v_db_userCredentials = await MON_MODEL_USER.findById(req.v_db_userCredentials._id).select(
        "+v_data_password"
    );

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
                    res.status(HTTP_STATUS_CODES.CREATED).json(
                        F_JSON_RESPONSE("user password has been updated", [])
                    );
                }

                // if new password match original:
                else {
                    res.status(HTTP_STATUS_CODES.BAD_REQUEST);
                    throw new Error("You cannot asign your same password, please try again");
                }
            }
            // if new passwords do not match:
            else {
                res.status(HTTP_STATUS_CODES.BAD_REQUEST);
                throw new Error("please confirm your new password correctly");
            }
        }

        // if user not found in DB:
        else {
            res.status(HTTP_STATUS_CODES.NOT_FOUND);
            throw new Error("your original password is wrong, type your correct password");
        }
    }

    // if wrong userCredentials:
    else {
        res.status(HTTP_STATUS_CODES.NOT_FOUND);
        throw new Error("user not found");
    }

    next();
});

export default F_API_UPDATE_PASSWORD;
