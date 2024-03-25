/* eslint-disable no-undef */
import jwt from "jsonwebtoken";

/**
 * ### Sign a JWT Token with your data payload
 * @param {Object} p_payload the data payload you want to encode
 * @returns {String} encoded JSON Web Token string payload
 */
function f_sign_jwt(p_payload) {
  const data_payload = {
    _id: p_payload._id,
    DATA_USERNAME: p_payload.DATA_USERNAME,
    DATA_EMAIL_ADDRESS: p_payload.DATA_EMAIL_ADDRESS,
  };

  const signed_jwt_string = jwt.sign(data_payload, process.env.V_JWT_SECRET, {
    expiresIn: "90d",
  });

  return signed_jwt_string;
}

export default f_sign_jwt;
