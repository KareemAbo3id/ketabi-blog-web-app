import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";
import Model_UserData from "../../server-data-models/user_data.model.js";

/**
 * ### Protect Private Routers Handler Middleware
 * Protect routers from access only when the user is logged in.
 */
const f_handle_protect_private_route = asyncHandler(async (req, res, next) => {
  // get the token from http request's cookies:
  let v_stored_jwt = req.cookies.jwt;

  // check if there is a token in http request:
  if (v_stored_jwt) {
    // token exists and valid:
    try {
      const v_decodedUserCredentials = jwt.verify(
        v_stored_jwt,
        // eslint-disable-next-line no-undef
        process.env.V_JWT_SECRET
      );

      req.v_get_user_credentials = await Model_UserData.findById(
        v_decodedUserCredentials._id
      ).select("-DATA_PASSWORD");

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
