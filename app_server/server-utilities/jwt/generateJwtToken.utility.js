/* eslint-disable no-undef */
import jwt from "jsonwebtoken";

/**
 * Define a JWT Token with a secret key and expire duration, Then save the generated JWT token in a http-only-cookie in the API's response object.
 * @param {String} p_http_cookie_name
 * @param {Object} p_http_response
 * @param {Object} p_payload
 * @returns {String} JWT_TOKEN
 */
function f_generateJwtAndSaveInHttpCookie(p_http_cookie_name, p_http_response, p_payload) {
    const v_encodeData = {
        _id: p_payload._id,
        data_emailAddress: p_payload.data_emailAddress,
        data_username: p_payload.data_username,
    };

    // define a JWT Token with a secret key and expire duration:
    const V_JWT_TOKEN = jwt.sign(
        // encode:
        v_encodeData,
        // secret key:
        process.env.V_JWT_SECRET,
        // options:
        { expiresIn: "90d" }
    );

    // save the generated JWT token in a http-only-cookie in the API's response object:
    p_http_response.cookie(
        // cookie name:
        p_http_cookie_name,
        // generated token:
        V_JWT_TOKEN,
        // options:
        {
            httpOnly: true,
            secure: process.env.V_NODE_ENV !== "development",
            sameSite: "strict",
            maxAge: 90 * 24 * 60 * 60 * 1000,
        }
    );
}

export default f_generateJwtAndSaveInHttpCookie;
