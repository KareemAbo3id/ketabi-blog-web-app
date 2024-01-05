import asyncHandler from "express-async-handler";
import HTTP_STATUS_CODES from "../../../server-utilities/status_codes.util.js";
import MON_MODEL_USER from "../../../server-data-modeling/user-models/User_Model.model.js";
import F_JSON_RESPONSE from "../../../server-utilities/json_response.util.js";

/**
 * ### Re-Activate User Account API
 * Re-activate user account.
 * @link /user/checkpoint/reactivate-account/:uid
 * @method PATCH
 * @access private
 */
const F_API_REACTIVATE_ACCOUNT = asyncHandler(async (request, response) => {
    // get the user credentials from DB:
    const v_db_userCredentials = await MON_MODEL_USER.findById(request.v_db_userCredentials._id);

    // REACTIVATE USER FROM DB:
    if (v_db_userCredentials) {
        //
        // toggle user account activation state to true:
        v_db_userCredentials.v_data_isAccountActive = true;

        // save the update
        // const updatedUserCredentials = await userCredentials.save();
        await v_db_userCredentials.save();

        // the result:
        response.status(HTTP_STATUS_CODES.CREATED).json(
            F_JSON_RESPONSE("user account has been re-activated", [
                {
                    _id: v_db_userCredentials._id,
                    v_data_isAccountActive: v_db_userCredentials.v_data_isAccountActive,
                },
            ])
        );
    }

    // if wrong userCredentials:
    else {
        response.status(HTTP_STATUS_CODES.NOT_FOUND);
        throw new Error("user not found");
    }
});

export default F_API_REACTIVATE_ACCOUNT;
