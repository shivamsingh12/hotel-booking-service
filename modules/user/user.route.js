const { createUser, login, getUsers, logout } = require("./user.controller");

async function userRoutes(app) {
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
  app.delete("/logout", logout);
  app.log.info("user routes registered");
}

module.exports = userRoutes;
