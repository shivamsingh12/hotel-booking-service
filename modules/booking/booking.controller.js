const prisma = require("../../utils/prisma");
const parseJwt = require("../../utils/decodeJWT");

async function createBooking(req, reply) {
  const { hotelId, bookedFor, from, to } = req.body;
  const { id: userId } = parseJwt(req.cookies.access_token);
  const fromInt = parseInt(from);
  const toInt = parseInt(to);
  try {
    const prevBooking = await prisma.booking.findMany({
      where: {
        hotelId: hotelId,
        userId: userId,
      },
    });
    console.log(
      "  ------------------------------------------  " +
        JSON.stringify(prevBooking)
    );
    if (prevBooking.length > 0) {
      return reply.send({ message: "booking already present for user" });
    }
    const booking = await prisma.booking.create({
      data: {
        hotelId,
        userId,
        bookedFor,
        from: fromInt,
        to: toInt,
        status: "BOOKED",
        members: "placeholder",
      },
    });
    return reply.code(201).send(booking);
  } catch (e) {
    return reply.code(500).send(e);
  }
}

async function getHotelBookingsForUser(req, reply) {
  const { hotelId } = req.params;
  const { id: userId } = parseJwt(req.cookies.access_token);

  try {
    const prevBooking = await prisma.booking.findMany({
      where: {
        hotelId: hotelId,
        userId: userId,
      },
    });
    console.log(
      "  ------------------------------------------  " +
        JSON.stringify(prevBooking)
    );

    return reply.code(200).send(prevBooking[0]);
  } catch (e) {
    return reply.code(500).send(e);
  }
}

module.exports = { createBooking, getHotelBookingsForUser };
