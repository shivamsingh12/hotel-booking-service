const fastify = require("fastify")({
  logger: true,
});
const cors = require("@fastify/cors");

const fjwt = require("@fastify/jwt");
const fCookie = require("@fastify/cookie");

fastify.register(fjwt, { secret: "supersecretcode-CHANGE_THIS-USE_ENV_FILE" });
fastify.addHook("preHandler", (req, res, next) => {
  req.jwt = fastify.jwt;
  return next();
});

fastify.register(fCookie, {
  secret: "some-secret-key",
  hook: "preHandler",
});

fastify.decorate("authenticate", async (req, reply) => {
  const token = req.cookies.access_token;
  if (!token) {
    return reply.status(401).send({ message: "Authentication required" });
  }
  const decoded = req.jwt.verify(token);
  req.user = decoded;
});

fastify.register(cors, { origin: "*" });
fastify.register(require("./modules/user/user.route"), { prefix: "api/users" });
fastify.register(require("./modules/hotel/hotel.route"), {
  prefix: "api/hotels",
});

fastify.listen({ port: 8000 }, function (err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  // Server is now listening on ${address}
});
