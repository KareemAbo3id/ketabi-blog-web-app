/* eslint-disable no-undef */
import { StatusCodes } from "http-status-codes";

/**
 * Not Found Error Handler
 * @type middleware function
 * not found error of server routers that returns `404 Not Found` error code
 * @returns {String} {error_status_code, error_message}
 */

function f_notFoundErrorHandler(req, res, next) {
    let v_errStatusCode = StatusCodes.NOT_FOUND;
    const v_errMessage = `Route Not Found: '${req.originalUrl}' Type the correct route path.`;

    res.status(v_errStatusCode).json({
        error_status_code: v_errStatusCode,
        error_message: v_errMessage,
    });

    next();
}

export default f_notFoundErrorHandler;
