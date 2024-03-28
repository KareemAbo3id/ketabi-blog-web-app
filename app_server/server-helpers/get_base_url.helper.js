/**
 * @fileoverview This file contains the server helper functions.
 * @module server_helpers
 * @KareemAbo3id
 */

/**
 * ### Get URL Base
 * Get the base URL of the server.
 * @param {Object} p_request
 * @returns {String} URL Base
 */
const f_get_url_base = (p_request) => {
  const url_base = `${p_request.protocol}://${p_request.get("host")}`;
  return url_base;
};

export default f_get_url_base;
