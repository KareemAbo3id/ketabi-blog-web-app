import { V_PORT } from "../server-configs/set_server_port.cnfg.js";

/**
 * Options for Swagger documentation.
 */
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.1",
    info: {
      version: "1.0.0",
      title: "Ketabi App APIs",
      description:
        "APIs documentation provided by Ketabi App.\n\n[See Ketabi project](https://github.com/KareemAbo3id/ketabi-blog-web-app)\n\n[See my Gitgub Account](https://github.com/KareemAbo3id)",
      contact: {
        email: "kareem.work1@hotmail.com",
      },
      servers: [`http://localhost:${V_PORT}`],
      tags: [
        {
          name: "User APIs",
        },
      ],
    },
  },
  apis: ["./app_server/server-controllers/**/*.js"],
};

export default swaggerOptions;
