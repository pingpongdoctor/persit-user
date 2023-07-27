import connectMongoDB from "./connectMongoDB";
import { User } from "./userModel";

const main = async function () {
  await connectMongoDB();

  await User.create({
    email: "thanhnhan@gmail.com",
    name: "simon",
    auth0UserId: "123",
  });
};

main();
