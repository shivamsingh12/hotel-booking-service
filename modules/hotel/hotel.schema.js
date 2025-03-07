const { z } = require("zod");
const { buildJsonSchemas } = require("fastify-zod");

const createHotelSchema = z.object({
  name: z.string(),
  description: z.string(),
  moreDescription: z.string(),
  reviews: z.string(),
  ratings: z.string(),
});

const HotelResponseSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  moreDescription: z.string(),
  reviews: z.string(),
  ratings: z.string(),
});

const HotelsResponseSchema = z.array(HotelResponseSchema);

const { schemas: hotelSchemas, $ref } = buildJsonSchemas({
  createHotelSchema,
  HotelResponseSchema,
  HotelsResponseSchema,
});
module.exports = { hotelSchemas, $ref };
