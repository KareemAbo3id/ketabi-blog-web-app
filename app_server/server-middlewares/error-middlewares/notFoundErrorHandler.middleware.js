/* eslint-disable no-undef */
import { StatusCodes } from "http-status-codes";

/**
 * Not Found Error Handler
 * @type middleware function
 * not found error of server routers that returns `404 Not Found` error code
 * @returns {String} {error_status_code, error_message}
 */

function notFoundErrorHandler(req, res, next) {
    let errStatusCode = StatusCodes.NOT_FOUND;
    const errMessage = `Route Not Found: '${req.originalUrl}' Type the correct route path.`;

    res.status(errStatusCode).json({
        error_status_code: errStatusCode,
        error_message: errMessage,
    });

    next();
}

export default notFoundErrorHandler;
