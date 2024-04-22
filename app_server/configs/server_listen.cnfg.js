/**
 * ### Starts the server and listens on the specified port.
 * @moduletype Configration
 *
 * @param {object} p_app The Express application object.
 * @param {number} p_port The port number to listen on.
 * @returns {function} An Express instance listen method.
 */
function f_cnfg_server_listen(p_app, p_port) {
  p_app.listen(p_port, () => {
    try {
      console.log(`\nSUCCESS: server listen on: ${p_port}`);
    } catch (error) {
      console.error(`\nFAIL: server error: ${error.message}`);
    }
  });
}

export default f_cnfg_server_listen;
