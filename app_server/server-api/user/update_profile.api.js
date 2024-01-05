import asyncHandler from "express-async-handler";
import HTTP_STATUS_CODES from "../../server-utilities/status_codes.util.js";
import MON_MODEL_USER from "../../server-data-modeling/user-models/User_Model.model.js";
import F_JSON_RESPONSE from "../../server-utilities/json_response.util.js";

/**
 * ### Update User Profile API
 * Update the authenticated user credentials and save it to DB.
 * @link /user/:uid
 * @method GET
 * @access private
 */
const F_API_UPDATE_PROFILE = asyncHandler(async (req, res) => {
    // get the user credentials from DB:
    const v_db_userCredentials = await MON_MODEL_USER.findById(
        req.v_db_userCredentials._id
    );

    // UPDATE USER DATA:
    // check if user credentials are true (retrieved) and assign submitted user credentials to DB credentials:
    if (v_db_userCredentials) {
        // assign user credentials to existed ones:
        v_db_userCredentials.v_data_firstName =
            req.body.v_data_firstName || v_db_userCredentials.v_data_firstName;

        v_db_userCredentials.v_data_lastName =
            req.body.v_data_lastName || v_db_userCredentials.v_data_lastName;

        v_db_userCredentials.v_data_emailAddress =
            req.body.v_data_emailAddress ||
            v_db_userCredentials.v_data_emailAddress;

        // save the update:
        await v_db_userCredentials.save();

        // the result:
        res.status(HTTP_STATUS_CODES.CREATED).json(
            F_JSON_RESPONSE("user account info has been updated", [])
        );
    }

    // if user not found in DB:
    else {
        res.status(HTTP_STATUS_CODES.NOT_FOUND);
        throw new Error(`User not found`);
    }
});

export default F_API_UPDATE_PROFILE;
