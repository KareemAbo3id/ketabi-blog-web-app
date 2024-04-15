/**
 * Options for Swagger documentation.
 */
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      version: "1.0.0",
      title: "Ketabi App APIs",
      description:
        "APIs documentation provided by Ketabi App.\n\n[See my Gitgub Account](https://github.com/KareemAbo3id)",
      contact: {
        email: "kareem.work1@hotmail.com",
      },
      servers: ["http://localhost:5555"],
    },
  },
  apis: ["./app_server/server-controllers/*/*/*.js"],
  components: {
    schemas: {
      User: {
        type: "object",
        properties: {
          id: {
            type: "ObjectID",
            example: "123a4bc56d7890ef1g2i3456",
          },
          DATA_EMAIL_ADDRESS: {
            type: "string",
            example: "user@domain.com",
          },
          DATA_USERNAME: {
            type: "string",
            example: "user_name",
          },
          DATA_PASSWORD: {
            type: "string",
            example: "1P@ssw0rd",
          },
          DATA_FIRSTNAME: {
            type: "string",
            example: "John",
          },
          DATA_LASTNAME: {
            type: "string",
            example: "Doe",
          },
          COUNTRY: {
            type: "string",
            example: "Palestine",
          },
          CITY: {
            type: "string",
            example: "Gaza",
          },
          FLAG_AGREEMENT_CONFIRMED: {
            type: "boolean",
          },
          FLAG_EMAIL_VERFIED: {
            type: "boolean",
          },
          FLAG_ACCOUNT_ACTIVATED: {
            type: "boolean",
          },
        },
      },
    },
  },
};

export default swaggerOptions;
