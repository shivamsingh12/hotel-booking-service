const { z } = require("zod");
const { buildJsonSchemas } = require("fastify-zod");

const createHotelSchema = z.object({
  name: z.string().min(6).max(20),
  description: z.string().min(10).max(90),
  moreDescription: z.string().min(100).max(750),
  reviews: z.string().min(1).max(10),
  ratings: z.string().min(1).max(3),
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
