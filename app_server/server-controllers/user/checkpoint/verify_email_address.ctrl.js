import asyncHandler from "express-async-handler";
import f_set_json_response from "../../../server-helpers/set_json_response.helper.js";
import Model_UserData from "../../../server-data-models/user_data.model.js";
import { f_check_userCredentials } from "../../../server-helpers/server_validation_funcs.helper.js";
import { StatusCodes } from "http-status-codes";
import f_get_server_validation_messages from "../../../server-helpers/server_validation_messages.helper.js";

const { Message_UserNotFound, Message_EmailVerified } = f_get_server_validation_messages();

/**
 * ### Verify User Email Address - Control
 * Send a verification link with user _id and token.
 * @endpoint /user/checkpoint/verify-email-address/:uid
 * @method PATCH
 * @access private
 */
const f_control_verify_email_address = asyncHandler(async (request, response) => {
  //
  // 1. get the user id from request query params:
  const _id = request.params.id;

  // 2. SERVER VALIDATION:

  // find user credentials in DB:
  const v_db_userCredentials = await Model_UserData.findById({ _id }).select("-DATA_PASSWORD");

  // check if user credentials are true (retrieved):
  if (!f_check_userCredentials(v_db_userCredentials)) {
    response.status(StatusCodes.NOT_FOUND);
    throw new Error(Message_UserNotFound);
  }

  // check if email address is not verified:
  if (!v_db_userCredentials.FLAG_EMAIL_VERFIED) {
    // 3. update user email address verification status:

    // update the user email address verification status in the database:
    v_db_userCredentials.FLAG_EMAIL_VERFIED = true;

    // save the updated user data:
    await v_db_userCredentials.save();

    // TODO [BACKEND]: send a verification approved email to the user email address

    // the result:
    response.status(StatusCodes.CREATED).json(
      f_set_json_response(Message_EmailVerified, {
        FLAG_EMAIL_VERFIED: v_db_userCredentials.FLAG_EMAIL_VERFIED,
      })
    );
  }

  // if email address is already verified:
  else {
    response.status(StatusCodes.BAD_REQUEST);
    throw new Error("Email address is already verified");
  }
});

export default f_control_verify_email_address;
