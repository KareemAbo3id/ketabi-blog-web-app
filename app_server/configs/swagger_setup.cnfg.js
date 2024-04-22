import swaggerUi from "swagger-ui-express";

/**
 * ### Sets up Swagger documentation for controllers to show API documentation.
 * @moduletype Configration
 *
 * @param {object} p_app The Express app object.
 * @param {string} p_docs_endpoint The endpoint path where the Swagger documentation will be served.
 * @param {object} p_swagger_docs The Swagger documentation object.
 * @returns {Promise<void>} A promise that resolves when the Swagger documentation is set up.
 */
async function f_cnfg_swagger_setup(p_app, p_docs_endpoint, p_swagger_docs) {
  await p_app.use(
    p_docs_endpoint,
    swaggerUi.serve,
    swaggerUi.setup(p_swagger_docs)
  );
}

export default f_cnfg_swagger_setup;
