/* eslint-disable no-undef */
import asyncHandler from "express-async-handler";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import User_Model from "../../server-data-modeling/user-models/User_Model.model.js";

/**
 * Protect routers from access only when the user is logged in.
 * get the user credentials payload from decoded cookie's token
 */
const ProtectPrivateRouter = asyncHandler(async (req, res, next) => {
    // get the token from http request's cookies:
    let token = req.cookies.jwt;

    // check if there is a token in http request:
    if (token) {
        // token exists and valid:
        try {
            const decodedUserCredentials = jwt.verify(token, process.env.JWT_SECRET);

            req.userCredentials = await User_Model.findById(decodedUserCredentials._id).select(
                "-password"
            );

            next();
        } catch (error) {
            res.status(StatusCodes.UNAUTHORIZED);
            throw new Error("invalid or wrong token");
        }
    }

    // if there is no token
    else {
        res.status(StatusCodes.UNAUTHORIZED);
        throw new Error("you are not authorized, no token");
    }
});

export default ProtectPrivateRouter;
