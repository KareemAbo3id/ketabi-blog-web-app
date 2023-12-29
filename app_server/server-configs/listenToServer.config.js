/**
 * Listen for connections of a running express server on a specfic port
 * @param {Function} app_server
 * @param {Number} app_port (default 80)
 * @returns {http.Server} http.Server
 */

function listenToServer(app_server, app_port = 80) {
    app_server.listen(app_port, () => {
        try {
            console.log(`✅ server updated on port: ${app_port}`);
        } catch (error) {
            console.error(`❌ server error: ${error.message}`);
        }
    });
}

export default listenToServer;
