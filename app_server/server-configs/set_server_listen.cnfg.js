/**
 * ### Express Server Listening for Connections Function
 * Listen for connections of a running Express server on a specfic port.
 * @param {Function} p_app_server
 * @param {Number} p_app_port
 * @returns {http.Server} A Node.js `http.Server`, and a callback function
 */
function f_set_server_listen(p_app_server, p_app_port) {
  p_app_server.listen(p_app_port, () => {
    try {
      console.log(`\nSUCCESS: server updated on port: ${p_app_port}`);
    } catch (error) {
      console.error(`\nFAIL: server error: ${error.message}`);
    }
  });
}

export default f_set_server_listen;
