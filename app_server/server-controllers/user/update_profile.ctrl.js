import asyncHandler from "express-async-handler";
import { StatusCodes } from "http-status-codes";
import Model_UserData from "../../server-data-models/user_data.model.js";
import f_set_json_response from "../../server-helpers/set_json_response.helper.js";

/**
 * ### Update User Profile - Control
 * Update the authenticated user credentials and save it to DB.
 * @link /user/:uid
 * @method GET
 * @access private
 */
const f_control_update_profile = asyncHandler(async (request, response) => {
  // TODO [server] update user profile controller

  // get the user credentials from DB:
  const v_get_user_credentials = await Model_UserData.findById(
    request.v_get_user_credentials._id
  );

  // UPDATE USER DATA:
  // check if user credentials are true (retrieved) and assign submitted user credentials to DB credentials:
  if (v_get_user_credentials) {
    // assign user credentials to existed ones:
    v_get_user_credentials.data_firstName =
      request.body.data_firstName || v_get_user_credentials.data_firstName;

    v_get_user_credentials.data_lastName =
      request.body.data_lastName || v_get_user_credentials.data_lastName;

    v_get_user_credentials.data_emailAddress =
      request.body.data_emailAddress ||
      v_get_user_credentials.data_emailAddress;

    // save the update:
    await v_get_user_credentials.save();

    // the result:
    response
      .status(StatusCodes.CREATED)
      .json(f_set_json_response("user account info has been updated"));
  }

  // if user not found in DB:
  else {
    response.status(StatusCodes.NOT_FOUND);
    throw new Error(`User not found`);
  }
});

export default f_control_update_profile;
