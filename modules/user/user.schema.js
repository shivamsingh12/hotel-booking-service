const { z } = require("zod");
const { buildJsonSchemas } = require("fastify-zod");

// data that we need from user to register
const createUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().min(6).max(20),
});
// response schema for registering user
const createUserResponseSchema = z.object({
  id: z.string(),
  email: z.string(),
  name: z.string(),
});
// same for login route
const loginSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email must be a string",
    })
    .email(),
  password: z.string().min(6),
});
const loginResponseSchema = z.object({
  accessToken: z.string(),
});

const { schemas: userSchemas, $ref } = buildJsonSchemas({
  createUserSchema,
  createUserResponseSchema,
  loginSchema,
  loginResponseSchema,
});
module.exports = { userSchemas, $ref };
