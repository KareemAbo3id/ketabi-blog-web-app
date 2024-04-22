/**
 * Swagger options for API documentation.
 * @moduletype Documentation
 */
const v_swagger_options = {
  swaggerDefinition: {
    openapi: "3.0.1",
    info: {
      version: "1.0.0",
      title: "Ketabi App APIs",
      description:
        "APIs Documentation provided by Ketabi App, various APIs for users, blog posts, and comments. [See Ketabi project on GitHub](https://github.com/KareemAbo3id/ketabi-blog-web-app)",
      contact: {
        email: "kareem.work1@hotmail.com",
      },
      servers: ["http://localhost:5555"],
      tags: [
        {
          name: "User APIs",
        },
      ],
    },
  },
  apis: ["./app_server/server-controllers/**/*.js"],
};

export default v_swagger_options;
