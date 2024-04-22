import { StatusCodes } from "http-status-codes";
import f_get_server_validation_messages from "../../server-helpers/server_validation_messages.helper.js";

const { Message_NotFoundRoute } = f_get_server_validation_messages();

/**
 * ### Middleware function to handle not found errors.
 * A server middleware function that handles returned `404 Page Not Found` errors.
 */
function f_mw_not_found_error(request, response, next) {
  const v_errMessage = Message_NotFoundRoute(request.originalUrl);

  response.status(StatusCodes.NOT_FOUND).json({
    error_message: v_errMessage,
  });

  next();
}

export default f_mw_not_found_error;



