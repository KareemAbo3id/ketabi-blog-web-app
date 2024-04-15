/**
 * ### Save data payload or a string in a httpOnly cookie of server response for 90 days - ready-to-use Function
 * @param {Any} p_payload data payload you want to save
 * @param {Object} p_response the API function response param
 * @returns {String} cookie
 */
function f_set_httponly_cookie(p_response, p_payload) {
  // eslint-disable-next-line no-undef
  p_response.cookie(process.env.V_JWT_NAME, p_payload, {
    httpOnly: true,
    // eslint-disable-next-line no-undef
    secure: process.env.V_NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: 90 * 24 * 60 * 60 * 1000,
  });
}

export default f_set_httponly_cookie;
