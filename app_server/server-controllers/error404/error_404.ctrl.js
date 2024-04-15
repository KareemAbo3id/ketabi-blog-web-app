import asyncHandler from "express-async-handler";
import { StatusCodes } from "http-status-codes";
import f_set_json_response from "../../server-helpers/set_json_response.helper.js";
import f_get_url_base from "../../server-helpers/get_base_url.helper.js";

/**
 * ### Handles the error 404 (page not found) request.
 *
 * @param {Object} request - The request object.
 * @param {Object} response - The response object.
 * @returns {Promise<void>} A promise that resolves when the response is sent.
 */
const f_control_error_404 = asyncHandler(async (request, response) => {
  // the result:
  const V_BASE_URL = f_get_url_base(request);
  const v_fullUrl = `${V_BASE_URL}${request.originalUrl}`;

  console.log(v_fullUrl);

  response.status(StatusCodes.NOT_FOUND).json(
    f_set_json_response("Error Not Found: page not found.", [
      {
        request_url: v_fullUrl,
      },
    ])
  );
});

export default f_control_error_404;
