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
      return reply
        .code(400)
        .send({ message: "booking already present for user" });
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

    return reply.code(200).send(prevBooking);
  } catch (e) {
    return reply.code(500).send(e);
  }
}

async function createCheckin(req, reply) {
  const { hotelId, members } = req.body;
  const { id: userId } = parseJwt(req.cookies.access_token);

  try {
    const prevBooking = await prisma.booking.findMany({
      where: {
        hotelId: hotelId,
        userId: userId,
      },
    });
    if (prevBooking.length == 0) {
      return reply.code(400).send({ message: "no booking present for user" });
    } else if (prevBooking[0].status == "CHECKEDIN") {
      return reply
        .code(400)
        .send({ message: "check in already present for booking" });
    } else if (prevBooking[0].status == "BOOKED") {
      const booking = await prisma.booking.updateMany({
        where: {
          hotelId: hotelId,
          userId: userId,
        },
        data: { status: "CHECKEDIN", members: members },
      });
      return reply.code(200).send(booking);
    } else {
      return reply.code(500).send({ message: "something went wrong" });
    }
  } catch (e) {
    return reply.code(500).send(e);
  }
}

async function createCheckout(req, reply) {
  const { hotelId } = req.body;
  const { id: userId } = parseJwt(req.cookies.access_token);

  try {
    const prevBooking = await prisma.booking.findMany({
      where: {
        hotelId: hotelId,
        userId: userId,
      },
    });
    if (prevBooking.length == 0) {
      return reply.code(400).send({ message: "no booking present for user" });
    } else if (prevBooking[0].status == "BOOKED") {
      return reply.code(400).send({ message: "no check in found for booking" });
    } else if (prevBooking[0].status == "CHECKEDIN") {
      const booking = await prisma.booking.deleteMany({
        where: {
          hotelId: hotelId,
          userId: userId,
        },
      });
      return reply.code(200).send(booking);
    } else {
      return reply.code(500).send({ message: "something went wrong" });
    }
  } catch (e) {
    return reply.code(500).send(e);
  }
}

module.exports = {
  createBooking,
  getHotelBookingsForUser,
  createCheckin,
  createCheckout,
};
