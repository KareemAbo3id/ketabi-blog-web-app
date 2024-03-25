/* eslint-disable no-undef */
import asyncHandler from "express-async-handler";
import { StatusCodes } from "http-status-codes";
import f_set_json_response from "../../server-helpers/set_json_response.helper.js";

/**
 * ### Error 404 not found API (for HTTP methods) - Control
 * An API endpoint returns Not-Found response.
 * @link /*
 * @method ALL
 * @access public
 */
const f_control_error_404 = asyncHandler(async (request, response) => {
  // the result:
  response
    .status(StatusCodes.NOT_FOUND)
    .json(
      f_set_json_response("Error Not Found: page not found.", [
        { requestedURL: request.originalUrl },
      ])
    );
});

export default f_control_error_404;
