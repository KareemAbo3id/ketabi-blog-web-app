/**
 * ### Returns the base URL of the request.
 *
 * @param {Object} p_request - The request object.
 */
const f_utl_url_base = (p_request) => {
  const url_base = `${p_request.protocol}://${p_request.get("host")}`;
  return url_base;
};

export default f_utl_url_base;
