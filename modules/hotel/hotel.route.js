const { hotelSchemas, $ref } = require("./hotel.schema");

async function hotelRoutes(app) {
  for (let schema of hotelSchemas) {
    app.addSchema(schema);
  }
}

module.exports = hotelRoutes;
