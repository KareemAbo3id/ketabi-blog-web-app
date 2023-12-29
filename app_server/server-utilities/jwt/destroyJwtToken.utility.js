/**
 * Destroy the JWT and remove http-only-cookie from local storage.
 * @param {String} http_cookie_name
 * @param {Object} http_response
 */
function destroyJwtAndRemoveHttpCookie(http_cookie_name, http_response) {
    // assign the http-only-cookie to an empty one and put Date to 0:
    http_response.cookie(http_cookie_name, "", {
        httpOnly: true,
        expires: new Date(0),
    });
}

export default destroyJwtAndRemoveHttpCookie;
