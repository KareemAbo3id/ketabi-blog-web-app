/**
 * Destroy the JWT and remove http-only-cookie from local storage.
 * @param {String} p_http_cookie_name
 * @param {Object} p_http_response
 */
function f_destroyJwtAndRemoveHttpCookie(p_http_cookie_name, p_http_response) {
    // assign the http-only-cookie to an empty one and put Date to 0:
    p_http_response.cookie(p_http_cookie_name, "", {
        httpOnly: true,
        expires: new Date(0),
    });
}

export default f_destroyJwtAndRemoveHttpCookie;
