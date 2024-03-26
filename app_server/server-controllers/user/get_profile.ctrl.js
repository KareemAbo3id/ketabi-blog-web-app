import asyncHandler from "express-async-handler";
import { StatusCodes } from "http-status-codes";
import f_set_json_response from "../../server-helpers/set_json_response.helper.js";

/**
 * ### Get User Profile - Control
 * get the authenticated user credentials from request.
 * @link /user/profile/:uid
 * @method GET
 * @access private
 */
const f_control_get_profile = asyncHandler(async (request, response) => {
  // TODO test the params from req
  // get the params from client request:
  // const v_loggedInUserCredentials = {
  //     _id: request.v_db_userCredentials._id,
  //     data_firstName: request.v_db_userCredentials.data_firstName,
  //     data_lastName: request.v_db_userCredentials.data_lastName,
  //     data_emailAddress: request.v_db_userCredentials.data_emailAddress,
  //     data_username: request.v_db_userCredentials.data_username,
  //     data_isEmailVerfied: request.v_db_userCredentials.data_isEmailVerfied,
  //     data_isAccountActive: request.v_db_userCredentials.data_isAccountActive,
  // };
  const v_loggedInUserCredentials = {
    ...request.v_db_userCredentials,
    data_isAccountActive: request.v_db_userCredentials.data_isAccountActive,
  };

  // if user account is active:
  if (v_loggedInUserCredentials.data_isAccountActive === true) {
    // the result:
    response.status(StatusCodes.OK).json(
      f_set_json_response("user profile has been retrieved", {
        profile: v_loggedInUserCredentials,
      })
    );
  }

  // if user account is deactive:
  else {
    response.status(StatusCodes.UNAUTHORIZED);
    throw new Error(
      `user @${v_loggedInUserCredentials.data_username} is deactivated`
    );
  }
});

export default f_control_get_profile;