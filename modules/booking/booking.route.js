const { bookingSchemas, $ref } = require("./booking.schema");
const {
  createBooking,
  getHotelBookingsForUser,
} = require("./booking.controller");

async function bookingRoutes(app) {
  for (let schema of bookingSchemas) {
    app.addSchema(schema);
  }

  app.addHook("preHandler", app.authenticate);

  app.post(
    "/",
    {
      schema: {
        body: $ref("createBookingSchema"),
        response: {
          201: $ref("bookingResponseSchema"),
        },
      },
    },
    createBooking
  );
  app.get("/:hotelId", getHotelBookingsForUser);
  app.log.info("booking routes registered");
}

module.exports = bookingRoutes;
