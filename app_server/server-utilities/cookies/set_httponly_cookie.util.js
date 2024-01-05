/* eslint-disable no-undef */
/**
 * ### Save data in a httpOnly cookie of server response - ready-to-use function
 * @param {String} p_cookie_name
 * @param {Any} p_cookie_value
 * @param {Object} p_response
 * @param {Number} p_cookie_age
 * @returns {String} HttpOnly Cookie
 */
function F_SET_HTTPONLY_COOKIE(p_cookie_name, p_cookie_value, p_response, p_cookie_age) {
    p_response.cookie(p_cookie_name, p_cookie_value, {
        httpOnly: true,
        secure: process.env.V_NODE_ENV !== "development",
        sameSite: "strict",
        maxAge: p_cookie_age,
    });
}

export default F_SET_HTTPONLY_COOKIE;
