import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import { StatusCodes } from "http-status-codes";
import Model_UserData from "../../server-data-models/user_data.model.js";
import f_set_json_response from "../../server-helpers/set_json_response.helper.js";

/**
 * ### Update User Password - Control
 * Update the authenticated user password and save it to DB.
 * @link /user/update-password/:uid
 * @method PUT
 * @access private
 */
const f_control_update_password = asyncHandler(
  async (request, response, next) => {
    // TODO [server] update user password controller

    // get the user credentials from DB:
    const v_get_user_credentials = await Model_UserData.findById(
      request.v_get_user_credentials._id
    ).select("+data_password");

    const v_isDbPasswordEqualCurrentPassword = await bcrypt.compare(
      request.body.data_password,
      v_get_user_credentials.data_password
    );

    // UPDATE USER PASSWORD:
    // check if user credentials are true (retrieved) and assign submitted user new password to DB password:
    if (v_get_user_credentials) {
      //
      // if user assign a new password equals to the original DB password:
      if (v_isDbPasswordEqualCurrentPassword) {
        //
        // check if newPassword is equal to confirmed  new password:
        if (
          request.body.data_newPassword === request.body.data_confirmNewPassword
        ) {
          //
          // if user assign a new password equals to the original DB password:
          if (request.body.data_password !== request.body.data_newPassword) {
            //
            // assign user new password to existed one:
            v_get_user_credentials.data_password =
              request.body.data_newPassword;

            // save the update
            // const updatedUserCredentials = await userCredentials.save();
            await v_get_user_credentials.save();

            // the result:
            response
              .status(StatusCodes.CREATED)
              .json(f_set_json_response("user password has been updated"));
          }

          // if new password match original:
          else {
            response.status(StatusCodes.BAD_REQUEST);
            throw new Error(
              "You cannot asign your same password, please try again"
            );
          }
        }
        // if new passwords do not match:
        else {
          response.status(StatusCodes.BAD_REQUEST);
          throw new Error("please confirm your new password correctly");
        }
      }

      // if user not found in DB:
      else {
        response.status(StatusCodes.NOT_FOUND);
        throw new Error(
          "your original password is wrong, type your correct password"
        );
      }
    }

    // if wrong userCredentials:
    else {
      response.status(StatusCodes.NOT_FOUND);
      throw new Error("user not found");
    }

    next();
  }
);

export default f_control_update_password;
