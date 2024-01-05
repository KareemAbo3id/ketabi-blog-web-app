/* eslint-disable no-undef */
import asyncHandler from "express-async-handler";
import F_JSON_RESPONSE from "../../server-utilities/json_response.util.js";
import HTTP_STATUS_CODES from "../../server-utilities/status_codes.util.js";

/**
 * ### Error 404 not found API (for HTTP methods)
 * An API endpoint returns Not-Found response.
 * @link /*
 * @method ALL
 * @access public
 */
const F_API_ERROR_404 = asyncHandler(async (request, response) => {
    // the result:
    response
        .status(HTTP_STATUS_CODES.NOT_FOUND)
        .json(
            F_JSON_RESPONSE("Error Not Found: page not found.", [
                { requestedURL: request.originalUrl },
            ])
        );
});

export default F_API_ERROR_404;
