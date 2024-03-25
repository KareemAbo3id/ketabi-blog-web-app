/* eslint-disable no-undef */
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";
import Model_UserData from "../../server-data-models/user/user_data.model.js";

/**
 * ### Protect Private Routers Handler Middleware
 * Protect routers from access only when the user is logged in.
 */
const f_handle_protect_private_route = asyncHandler(async (req, res, next) => {
  // get the token from http request's cookies:
  let v_token = req.cookies.jwt;

  // check if there is a token in http request:
  if (v_token) {
    // token exists and valid:
    try {
      const v_decodedUserCredentials = jwt.verify(
        v_token,
        process.env.V_JWT_SECRET
      );

      req.v_db_userCredentials = await Model_UserData.findById(
        v_decodedUserCredentials._id
      ).select("-data_password");

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

export default f_handle_protect_private_route;
