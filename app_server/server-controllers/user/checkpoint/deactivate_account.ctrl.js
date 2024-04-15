import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import { StatusCodes } from "http-status-codes";
import Model_UserData from "../../../server-data-models/user_data.model.js";
import f_delete_httponly_cookie from "../../../server-services/cookies/delete_httponly_cookie.service.js";
import f_set_json_response from "../../../server-helpers/set_json_response.helper.js";

/**
 * ### De-Activate User Account - Control
 * De-activate user account and delete the token from httpOnly cookie.
 * @link /user/checkpoint/deactivate-account/:uid
 * @method PATCH
 * @access private
 */
const f_control_deactivate_account = asyncHandler(async (request, response) => {
  // TODO [server] update deactivate user account controller
  // get the user credentials from DB:
  const v_get_user_credentials = await Model_UserData.findById(
    request.v_get_user_credentials._id
  ).select("+data_password");

  const v_passwordsMatchFlag = await bcrypt.compare(
    request.body.data_password,
    v_get_user_credentials.data_password
  );

  // DELETE USER FROM DB:
  // check if user credentials are true (retrieved) and compare submitted password:
  if (v_get_user_credentials) {
    //
    // if user assign a new password equals to the original DB password:
    if (v_passwordsMatchFlag) {
      //
      // toggle user account activation state to false:
      v_get_user_credentials.data_isAccountActive = false;

      // destory and re-generate updated JWT and save it in http-cookie:
      // eslint-disable-next-line no-undef
      f_delete_httponly_cookie(process.env.V_JWT_NAME, response);

      // save the update
      // const updatedUserCredentials = await userCredentials.save();
      await v_get_user_credentials.save();

      // the result:
      response
        .status(StatusCodes.CREATED)
        .json(
          f_set_json_response(
            "user account has been deactivated and logged out, token deleted"
          )
        );
    }

    // if new passwords do not match:
    else {
      response.status(StatusCodes.BAD_REQUEST);
      throw new Error("please confirm your new password correctly");
    }
  }

  // if wrong userCredentials:
  else {
    response.status(StatusCodes.NOT_FOUND);
    throw new Error("user not found");
  }
});

export default f_control_deactivate_account;
