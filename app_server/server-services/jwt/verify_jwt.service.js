/* eslint-disable no-undef */
import jwt from "jsonwebtoken";

/**
 * ### Verify a JWT Token with given secret
 * @param {String} p_token the token you want to verify
 * @returns {Object} decoded JSON Web Token payload
 */
function f_verify_jwt(p_token) {
  return jwt.verify(p_token, process.env.V_JWT_SECRET);
}

export default f_verify_jwt;
