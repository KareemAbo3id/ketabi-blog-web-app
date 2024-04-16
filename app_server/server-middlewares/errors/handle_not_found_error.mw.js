import { StatusCodes } from "http-status-codes";

/**
 * ### 404 Not Found Error Handler Middleware
 * A server middleware function that handles returned `404 Page Not Found` errors.
 */
function f_handle_not_found_error(req, res, next) {
  // FIX [server] not found error handler middleware
  let v_errStatusCode = StatusCodes.NOT_FOUND;
  const v_errMessage = `Route Not Found: '${req.originalUrl}' Type the correct route path.`;

  res.status(v_errStatusCode).json({
    error_message: v_errMessage,
    error_status_code: v_errStatusCode,
  });

  next();
}

export default f_handle_not_found_error;

// TODO [server] set swagger docs for this middleware f_handle_not_found_error
