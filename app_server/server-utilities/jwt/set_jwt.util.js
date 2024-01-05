/* eslint-disable no-undef */
import jwt from "jsonwebtoken";
import F_SET_HTTPONLY_COOKIE from "../cookies/set_httponly_cookie.util.js";

/**
 * ### define a JWT Token with the payload, a secret key and expire duration
 * ### set the generated JWT token as a value of a httpOnly cookie in
 * @param {Object} p_response
 * @param {Object} p_payload
 * @returns {String} jwt
 */
function F_SET_JWT(p_response, p_payload) {
    const v_encodeData = {
        _id: p_payload._id,
        data_emailAddress: p_payload.data_emailAddress,
        data_username: p_payload.data_username,
    };

    const dur90d = 90 * 24 * 60 * 60 * 1000;

    // define a JWT Token with the payload, a secret key and expire duration:
    const V_JWT_TOKEN = jwt.sign(v_encodeData, process.env.V_JWT_SECRET, {
        expiresIn: "90d",
    });

    // set the generated JWT token as a value of a httpOnly cookie in:
    F_SET_HTTPONLY_COOKIE(
        process.env.V_JWT_NAME,
        V_JWT_TOKEN,
        p_response,
        dur90d
    );
}

export default F_SET_JWT;
