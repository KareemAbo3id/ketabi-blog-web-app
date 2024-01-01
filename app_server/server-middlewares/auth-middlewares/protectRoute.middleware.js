/* eslint-disable no-undef */
import asyncHandler from "express-async-handler";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import db_model_UserModel from "../../server-data-modeling/user-models/User_Model.model.js";

/**
 * Protect routers from access only when the user is logged in.
 * get the user credentials payload from decoded cookie's token
 */
const f_ProtectPrivateRouter = asyncHandler(async (req, res, next) => {
    // get the token from http request's cookies:
    let v_token = req.cookies.jwt;

    // check if there is a token in http request:
    if (v_token) {
        // token exists and valid:
        try {
            const v_decodedUserCredentials = jwt.verify(v_token, process.env.V_JWT_SECRET);

            req.v_db_userCredentials = await db_model_UserModel
                .findById(v_decodedUserCredentials._id)
                .select("-v_data_password");

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

export default f_ProtectPrivateRouter;
