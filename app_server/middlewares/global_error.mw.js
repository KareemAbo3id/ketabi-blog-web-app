import { StatusCodes } from "http-status-codes";

/**
 * ### Global Error Handler Middleware
 * @moduletype Middleware
 *
 * @returns {Function} Calls the next middleware.
 */
function f_mw_global_error_handler(err, req, res, next) {
  // FIX [server] global error handler middleware
  let v_errStatusCode =
    res.statusCode === StatusCodes.OK
      ? StatusCodes.INTERNAL_SERVER_ERROR
      : res.statusCode;
  let v_errMessage = err.message;
  let v_errStack = err.stack;

  // check error comming from mongoose { name: CastError, kind: ObjectId }
  if (err.name === "CastError" && err.kind === "ObjectId") {
    v_errStatusCode = StatusCodes.NOT_FOUND;
    v_errMessage = "The requested resource was not found";
  }

  res.status(v_errStatusCode).json({
    error_message: v_errMessage,
    error_status_code: v_errStatusCode,
    error_stack:
      // eslint-disable-next-line no-undef
      process.env.V_EXPRESS_SERVER_ENV === "production" ? null : v_errStack,
  });

  next();
}

export default f_mw_global_error_handler;
