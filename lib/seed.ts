import { connectMongoDB, disconnectMongoDB } from "./connectMongoDB";
import { ProjectModel, UserModel } from "./schemas";

const main = async function () {
  await connectMongoDB();

  const users = await UserModel.find({});

  console.log(users);
  await disconnectMongoDB();
};

main();
