/**
 * ### Ready-to-use object to show Server JSON response
 * @param {String} p_message
 * @param {Array} p_data
 * @returns {{res_message, res_data}}
 */

function F_JSON_RESPONSE(p_message, p_data) {
    return { res_message: p_message, res_data: p_data };
}

export default F_JSON_RESPONSE;
