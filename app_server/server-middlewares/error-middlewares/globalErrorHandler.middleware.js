/* eslint-disable no-undef */
import { StatusCodes } from "http-status-codes";

/**
 * Global Error Handler
 *
 * global server API error handler that returns error object
 * @returns {Object} {error_status_code, error_message, error_stack}
 */
function f_globalErrorHandler(err, req, res, next) {
    let v_errStatusCode =
        res.statusCode === StatusCodes.OK ? StatusCodes.INTERNAL_SERVER_ERROR : res.statusCode;
    let v_errMessage = err.message;
    let v_errStack = err.stack;

    // check mongoose error, name of: CastError, kind of: ObjectId
    if (err.name === "CastError" && err.kind === "ObjectId") {
        v_errStatusCode = StatusCodes.NOT_FOUND;
        v_errMessage = "The requested resource was not found";
    }

    res.status(v_errStatusCode).json({
        error_status_code: v_errStatusCode,
        error_message: v_errMessage,
        error_stack: process.env.V_NODE_ENV === "production" ? null : v_errStack,
    });

    next();
}

export default f_globalErrorHandler;
