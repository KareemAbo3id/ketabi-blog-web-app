/* eslint-disable no-undef */
/**
 * ### Delete he httpOnly cookie of server response - ready-to-use function
 * @param {Object} p_response the API function response param
 */
function f_delete_httponly_cookie(p_response) {
  // assign the http-only-cookie to an empty srting:
  p_response.cookie(process.env.V_JWT_NAME, "", {
    httpOnly: true,
    // put Date to 0:
    expires: new Date(0),
  });
}

export default f_delete_httponly_cookie;
