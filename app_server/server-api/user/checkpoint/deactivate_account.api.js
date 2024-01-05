/* eslint-disable no-undef */
import asyncHandler from "express-async-handler";
import HTTP_STATUS_CODES from "../../../server-utilities/status_codes.util.js";
import MON_MODEL_USER from "../../../server-data-modeling/user-models/User_Model.model.js";
import F_DEL_JWT from "../../../server-utilities/jwt/del_jwt.util.js";
import F_JSON_RESPONSE from "../../../server-utilities/json_response.util.js";

/**
 * ### De-Activate User Account API
 * De-activate user account and delete the token from httpOnly cookie.
 * @link /user/checkpoint/deactivate-account/:uid
 * @method PATCH
 * @access private
 */
const F_API_DEACTIVATE_ACCOUNT = asyncHandler(async (request, response) => {
    // get the user credentials from DB:
    const v_db_userCredentials = await MON_MODEL_USER.findById(
        request.v_db_userCredentials._id
    ).select("+v_data_password");

    const v_passwordsMatchFlag = await bcrypt.compare(
        request.body.v_data_password,
        v_db_userCredentials.v_data_password
    );

    // DELETE USER FROM DB:
    // check if user credentials are true (retrieved) and compare submitted password:
    if (v_db_userCredentials) {
        //
        // if user assign a new password equals to the original DB password:
        if (v_passwordsMatchFlag) {
            //
            // toggle user account activation state to false:
            v_db_userCredentials.v_data_isAccountActive = false;

            // destory and re-generate updated JWT and save it in http-cookie:
            F_DEL_JWT(process.env.V_JWT_NAME, response);

            // save the update
            // const updatedUserCredentials = await userCredentials.save();
            await v_db_userCredentials.save();

            // the result:
            response
                .status(HTTP_STATUS_CODES.CREATED)
                .json(
                    F_JSON_RESPONSE(
                        "user account has been deactivated and logged out, token deleted",
                        []
                    )
                );
        }

        // if new passwords do not match:
        else {
            response.status(HTTP_STATUS_CODES.BAD_REQUEST);
            throw new Error("please confirm your new password correctly");
        }
    }

    // if wrong userCredentials:
    else {
        response.status(HTTP_STATUS_CODES.NOT_FOUND);
        throw new Error("user not found");
    }
});

export default F_API_DEACTIVATE_ACCOUNT;
