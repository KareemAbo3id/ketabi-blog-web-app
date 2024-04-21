/**
 * ### Sets the server to listen on the specified port.
 *
 * @param {Object} p_app_server - The application server object.
 * @param {number} p_app_port - The port number to listen on.
 */
function f_cnfg_server_listen(p_app_server, p_app_port) {
  p_app_server.listen(p_app_port, () => {
    try {
      console.log(`\nSUCCESS: server updated on port: ${p_app_port}`);
    } catch (error) {
      console.error(`\nFAIL: server error: ${error.message}`);
    }
  });
}

export default f_cnfg_server_listen;
