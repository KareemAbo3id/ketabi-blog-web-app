/**
 * Listen for connections of a running express server on a specfic port
 * @param {Function} p_app_server
 * @param {Number} p_app_port (default 80)
 * @returns {http.Server} http.Server
 */

function f_listenToServer(p_app_server, p_app_port = 80) {
    p_app_server.listen(p_app_port, () => {
        try {
            console.log(`\n✅ server updated on port: ${p_app_port}`);
        } catch (error) {
            console.error(`\n❌ server error: ${error.message}`);
        }
    });
}

export default f_listenToServer;
