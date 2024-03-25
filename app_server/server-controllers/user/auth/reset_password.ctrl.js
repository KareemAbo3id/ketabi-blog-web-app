import asyncHandler from "express-async-handler";
import { StatusCodes } from "http-status-codes";
import Model_UserData from "../../../server-data-models/user_data.model.js";

/**
 * ### Reset Password Link - Control
 * Reset password by link.
 * @endpoint /user/auth//reset-password/:userId/:tokenExtension
 * @method PUT
 * @access public
 */
export const f_control_reset_password_link = asyncHandler(
  async (request, response) => {
    //
    // get the params from client request:
    const { _id } = request.params;
    const { NEW_PASSWORD, CONFIRM_NEW_PASSWORD } = request.body;

    // get the user credentials from DB:
    const v_db_userCredentials = await Model_UserData.findById(_id).select(
      "+DATA_PASSWORD"
    );

    // check if user credentials are true (retrieved) and assign submitted user new password to DB password:
    if (v_db_userCredentials) {
      //
      // check if newPassword is equal to confirmed new password:
      if (NEW_PASSWORD === CONFIRM_NEW_PASSWORD) {
        //
        // assign user new password to existed one:
        v_db_userCredentials.DATA_PASSWORD = NEW_PASSWORD;

        // save the update
        await v_db_userCredentials.save();

        // the result:
        response
          .status(StatusCodes.CREATED)
          .json({ message: "user password has been updated" });
      }

      // if new password match original:
      else {
        response.status(StatusCodes.BAD_REQUEST);
        throw new Error(
          "You cannot asign your same password, please try again"
        );
      }
    }
  }
);

export default f_control_reset_password_link;
