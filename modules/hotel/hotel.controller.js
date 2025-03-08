const prisma = require("../../utils/prisma");

// async function createHotel(req, reply) {
//   const { name, description, moreDescription, reviews, ratings } = req.body;
//   try {
//     const hotel = await prisma.hotel.create({
//       data: {
//         name,
//         description,
//         moreDescription,
//         reviews,
//         ratings,
//       },
//     });
//     return reply.code(201).send(hotel);
//   } catch (e) {
//     return reply.code(500).send(e);
//   }
// }

async function getHotel(req, reply) {
  const { hotelId: id } = req.params;
  try {
    const hotel = await prisma.hotel.findUnique({
      where: {
        id,
      },
    });
    return reply.code(200).send(hotel);
  } catch (e) {
    return reply.code(500).send(e);
  }
}

async function getHotels(req, reply) {
  const { skip, take } = req.query;
  try {
    const hotel = await prisma.hotel.findMany({
      skip: parseInt(skip),
      take: parseInt(take),
    });
    return reply.code(200).send(hotel);
  } catch (e) {
    return reply.code(500).send(e);
  }
}

// async function deleteHotel(req, reply) {
//   const { hotelId: id } = req.params;
//   try {
//     const deleteUsers = await prisma.hotel.deleteMany({
//       where: {
//         id: {
//           contains: id,
//         },
//       },
//     });
//     return reply.code(200).send(deleteUsers);
//   } catch (e) {
//     return reply.code(500).send(e);
//   }
// }

module.exports = { getHotel, getHotels };
