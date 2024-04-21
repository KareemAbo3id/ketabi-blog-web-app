/**
 * ### Ready-to-use object to show Server JSON response
 * @param {String} p_message The response message _(must be a string)_
 * @param {object} p_data The response data _(must be an object)_
 * @returns {object} The JSON response object
 */
function f_utl_json_response(p_message, p_data) {
  // parameter type check:
  if (typeof p_message !== "string")
    throw new TypeError("p_message must be a string.");

  if (typeof p_data !== "object")
    throw new TypeError("p_data must be an object.");

  // return the response object:
  return { "response message": p_message, "response data": p_data };
}

export default f_utl_json_response;
