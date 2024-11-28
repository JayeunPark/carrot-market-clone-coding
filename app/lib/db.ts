import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();
// user 테스트
// async function test() {
//   const user = await db.user.create({
//     data: {
//       username: "asdf",
//     },
//   });
//   console.log(user);
// }
// test();

// sMSToken 테스트
// async function test() {
//   const token = await db.sMSToken.create({
//     data: {
//       token: "121212",
//       user: {
//         connect: {
//           id: 1,
//         },
//       },
//     },
//   });
//   console.log(token);
// }
// test();
export default db;
