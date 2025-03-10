const { createUser, login, getUsers, logout } = require("./user.controller");
const { userSchemas, $ref } = require("./user.schema");

async function userRoutes(app) {
  for (let schema of userSchemas) {
    app.addSchema(schema);
  }
  app.get(
    "/",
    {
      preHandler: [app.authenticate],
    },
    getUsers
  );
  app.post(
    "/register",
    {
      schema: {
        body: $ref("createUserSchema"),
        response: {
          201: $ref("createUserResponseSchema"),
        },
      },
    },
    createUser
  );
  app.post(
    "/login",
    {
      schema: {
        body: $ref("loginSchema"),
        response: {
          201: $ref("loginResponseSchema"),
        },
      },
    },
    login
  );
  app.delete(
    "/logout",
    {
      preHandler: [app.authenticate],
    },
    logout
  );
  app.log.info("user routes registered");
}

module.exports = userRoutes;
