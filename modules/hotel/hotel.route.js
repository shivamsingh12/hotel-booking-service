const { hotelSchemas, $ref } = require("./hotel.schema");
const {
  getHotel,
  getHotels,
  //   createHotel,
  //   deleteHotel,
} = require("./hotel.controller");

async function hotelRoutes(app) {
  for (let schema of hotelSchemas) {
    app.addSchema(schema);
  }

  app.get(
    "/",
    {
      schema: {
        response: {
          201: $ref("HotelsResponseSchema"),
        },
      },
    },
    getHotels
  );
  app.get(
    "/:hotelId",
    {
      schema: {
        response: {
          201: $ref("HotelResponseSchema"),
        },
      },
    },
    getHotel
  );
  //   app.post(
  //     "/",
  //     {
  //       schema: {
  //         body: $ref("createHotelSchema"),
  //         response: {
  //           201: $ref("HotelResponseSchema"),
  //         },
  //       },
  //     },
  //     createHotel
  //   );
  //   app.delete("/:hotelId", deleteHotel);
  app.log.info("hotel routes registered");
}

module.exports = hotelRoutes;
