import asyncHandler from "express-async-handler";
import { StatusCodes } from "http-status-codes";
import bcrypt from "bcryptjs";
import Model_UserData from "../../../server-data-models/user_data.model.js";
import f_set_json_response from "../../../server-helpers/set_json_response.helper.js";
import f_get_server_validation_messages from "../../../server-helpers/server_validation_messages.helper.js";
import { f_check_userCredentials } from "../../../server-helpers/server_validation_funcs.helper.js";

const { Message_UserNotFound, Message_PasswordsNotMatch, Message_TokenNotValidExpired } =
  f_get_server_validation_messages();

/**
 * ### Reset Password - Control
 * Reset the user password.
 * @endpoint /user/auth/reset-password/:TEMP_RESET_PASSWORD_TOKEN
 * @method PATCH
 * @access public
 */

const f_control_reset_password = asyncHandler(async (request, response) => {
  //
  // 1. get the `TEMP_RESET_PASSWORD_TOKEN` from the URL
  const { TEMP_RESET_PASSWORD_TOKEN } = request.params;

  // 2. get the new password and confirm new password from request body:
  const { DATA_NEW_PASSWORD, DATA_CONFIRM_NEW_PASSWORD } = request.body;

  // 3. SERVER VALIDATION:

  // find user credentials in DB:
  const v_db_userCredentials = await Model_UserData.findOne({
    TEMP_RESET_PASSWORD_TOKEN,
  }).select("+DATA_PASSWORD");

  // check if user credentials are true (retrieved):
  if (!f_check_userCredentials(v_db_userCredentials)) {
    response.status(StatusCodes.NOT_FOUND);
    throw new Error(`${Message_TokenNotValidExpired} or ${Message_UserNotFound}`);
  }

  // check if the token is expired:
  if (v_db_userCredentials.TEMP_RESET_PASSWORD_TOKEN_EXPIRES < Date.now()) {
    response.status(StatusCodes.BAD_REQUEST);
    throw new Error(Message_TokenNotValidExpired);
  }

  // check if DATA_NEW_PASSWORD and DATA_CONFIRM_NEW_PASSWORD are equal:
  if (DATA_NEW_PASSWORD !== DATA_CONFIRM_NEW_PASSWORD) {
    response.status(StatusCodes.BAD_REQUEST);
    throw new Error(Message_PasswordsNotMatch);
  }

  // check if DATA_NEW_PASSWORD is equal to DATA_PASSWORD:
  const v_isDbPasswordEqualCurrentPassword = await bcrypt.compare(
    DATA_NEW_PASSWORD,
    v_db_userCredentials.DATA_PASSWORD
  );

  if (v_isDbPasswordEqualCurrentPassword) {
    response.status(StatusCodes.BAD_REQUEST);
    throw new Error("You cannot assign your same password, please try again");
  }

  // 4. update the user password in the database:
  // v_db_userCredentials.updateOne({ DATA_PASSWORD: DATA_NEW_PASSWORD });
  v_db_userCredentials.DATA_PASSWORD = DATA_NEW_PASSWORD;
  // 5. delete the token and token expiry time from the database:
  v_db_userCredentials.TEMP_RESET_PASSWORD_TOKEN = undefined;
  v_db_userCredentials.TEMP_RESET_PASSWORD_TOKEN_EXPIRES = undefined;

  // save the update:
  await v_db_userCredentials.save();

  // TODO [BACKEND]: send an email to the user that the password has been changed.

  // the result:
  response.status(StatusCodes.CREATED).json(f_set_json_response("user password has been updated"));
});

export default f_control_reset_password; // done.
