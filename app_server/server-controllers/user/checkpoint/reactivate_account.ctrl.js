import asyncHandler from "express-async-handler";
import { StatusCodes } from "http-status-codes";
import Model_UserData from "../../../server-data-models/user/user_data.model.js";
import f_set_json_response from "../../../server-helpers/set_json_response.helper.js";

/**
 * ### Re-Activate User Account - Control
 * Re-activate user account.
 * @link /user/checkpoint/reactivate-account/:uid
 * @method PATCH
 * @access private
 */
const f_control_reactivate_account = asyncHandler(async (request, response) => {
  // get the user credentials from DB:
  const v_db_userCredentials = await Model_UserData.findById(
    request.v_db_userCredentials._id
  );

  // REACTIVATE USER FROM DB:
  if (v_db_userCredentials) {
    //
    // toggle user account activation state to true:
    v_db_userCredentials.data_isAccountActive = true;

    // save the update
    // const updatedUserCredentials = await userCredentials.save();
    await v_db_userCredentials.save();

    // the result:
    response.status(StatusCodes.CREATED).json(
      f_set_json_response("user account has been re-activated", {
        _id: v_db_userCredentials._id,
        data_isAccountActive: v_db_userCredentials.data_isAccountActive,
      })
    );
  }

  // if wrong userCredentials:
  else {
    response.status(StatusCodes.NOT_FOUND);
    throw new Error("user not found");
  }
});

export default f_control_reactivate_account;
