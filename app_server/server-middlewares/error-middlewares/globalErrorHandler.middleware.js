/* eslint-disable no-undef */
import { StatusCodes } from "http-status-codes";

/**
 * Global Error Handler
 *
 * global server API error handler that returns error object
 * @returns {Object} {error_status_code, error_message, error_stack}
 */
function globalErrorHandler(err, req, res, next) {
    let errStatusCode =
        res.statusCode === StatusCodes.OK ? StatusCodes.INTERNAL_SERVER_ERROR : res.statusCode;
    let errMessage = err.message;
    let errStack = err.stack;

    // check mongoose error, name of: CastError, kind of: ObjectId
    if (err.name === "CastError" && err.kind === "ObjectId") {
        errStatusCode = StatusCodes.NOT_FOUND;
        errMessage = "The requested resource was not found";
    }

    res.status(errStatusCode).json({
        error_status_code: errStatusCode,
        error_message: errMessage,
        error_stack: process.env.NODE_ENV === "production" ? null : errStack,
    });

    next();
}

export default globalErrorHandler;
