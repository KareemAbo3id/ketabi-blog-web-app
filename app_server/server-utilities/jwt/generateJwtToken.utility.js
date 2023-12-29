/* eslint-disable no-undef */
import jwt from "jsonwebtoken";

/**
 * Define a JWT Token with a secret key and expire duration, Then save the generated JWT token in a http-only-cookie in the API's response object.
 * @param {String} http_cookie_name
 * @param {Object} http_response
 * @param {Object} payload
 * @returns {String} JWT_TOKEN
 */
function generateJwtAndSaveInHttpCookie(http_cookie_name, http_response, payload) {
    const encodeData = {
        _id: payload._id,
        emailAddress: payload.emailAddress,
        username: payload.username,
    };

    // define a JWT Token with a secret key and expire duration:
    const JWT_TOKEN = jwt.sign(
        // encode:
        encodeData,
        // secret key:
        process.env.JWT_SECRET,
        // options:
        { expiresIn: "90d" }
    );

    // save the generated JWT token in a http-only-cookie in the API's response object:
    http_response.cookie(
        // cookie name:
        http_cookie_name,
        // generated token:
        JWT_TOKEN,
        // options:
        {
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            sameSite: "strict",
            maxAge: 90 * 24 * 60 * 60 * 1000,
        }
    );
}

export default generateJwtAndSaveInHttpCookie;
