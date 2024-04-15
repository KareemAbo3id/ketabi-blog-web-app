import swaggerJsDoc from "swagger-jsdoc";
import swaggerOptions from "./swagger_opts.js";

/**
 * Swagger documentation object.
 */
const swaggerDocs = swaggerJsDoc(swaggerOptions);

export default swaggerDocs;
