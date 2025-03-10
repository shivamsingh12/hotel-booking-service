const { z } = require("zod");
const { buildJsonSchemas } = require("fastify-zod");

const createBookingSchema = z.object({
  hotelId: z.string().min(10).max(30),
  bookedFor: z.string().min(5).max(20),
  from: z.string().min(5).max(20),
  to: z.string().min(5).max(20),
});

const bookingResponseSchema = z.object({
  id: z.string(),
  bookedFor: z.string(),
  status: z.string(),
  members: z.string(),
});

const checkinSchema = z.object({
  hotelId: z.string().min(10).max(30),
  members: z.string().min(10).max(200),
});

const checkoutSchema = z.object({
  hotelId: z.string().min(10).max(30),
});

const { schemas: bookingSchemas, $ref } = buildJsonSchemas({
  createBookingSchema,
  bookingResponseSchema,
  checkinSchema,
  checkoutSchema,
});
module.exports = { bookingSchemas, $ref };
