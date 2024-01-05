/* eslint-disable no-undef */
/**
 * ### Delete the JWT from httpOnly cookie located in local storage
 * @param {Object} p_response
 */
function F_DEL_JWT(p_response) {
    // assign the http-only-cookie to an empty one and put Date to 0:
    p_response.cookie(process.env.V_JWT_NAME, "", {
        httpOnly: true,
        expires: new Date(0),
    });
}

export default F_DEL_JWT;
