import swaggerUi from "swagger-ui-express";

/**
 * ### Sets the swagger documentation setup.
 *
 * @param {Object} p_app_server - The application server object.
 * @param {Object} p_swagger_documentation - The swagger documentation object.
 */
async function f_set_swagger_setup(
  p_app_server,
  p_api_docs_Path,
  p_swagger_documentation
) {
  await p_app_server.use(
    p_api_docs_Path,
    swaggerUi.serve,
    swaggerUi.setup(p_swagger_documentation)
  );
}

export default f_set_swagger_setup;
