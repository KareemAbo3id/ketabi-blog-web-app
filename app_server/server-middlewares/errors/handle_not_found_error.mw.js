import { StatusCodes } from "http-status-codes";

/**
 * ### 404 Not Found Error Handler Middleware
 * A server middleware function that handles returned `404 Page Not Found` errors.
 * @returns {Object} {error_status_code, error_message}
 */
function f_handle_not_found_error(req, res, next) {
  let v_errStatusCode = StatusCodes.NOT_FOUND;
  const v_errMessage = `Route Not Found: '${req.originalUrl}' Type the correct route path.`;

  res.status(v_errStatusCode).json({
    error_status_code: v_errStatusCode,
    error_message: v_errMessage,
  });

  next();
}

export default f_handle_not_found_error;