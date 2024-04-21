/**
 * ### Ready-to-use object to show Server JSON response
 * @param {String} p_message
 * @param {Object} p_data
 */
function f_set_json_response(p_message, p_data) {
  return { "response message": p_message, "response data": p_data };
}

export default f_set_json_response;
