import mongoose from "mongoose";
const uri =
  "mongodb+srv://vercel-admin-user:e6MCKfhJJSATFd7M@lessyprojectdb.eqben55.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

console.log(uri);

export const connectMongoDB = async () => {
  try {
    await mongoose.connect(uri);
    console.log("CONNECTED TO MONGODB");
  } catch (error) {
    console.log(error);
  }
};

export const disconnectMongoDB = async () => {
  try {
    await mongoose.disconnect();
    console.log("DISCONNECTED FROM MONGODB");
  } catch (error) {
    console.log(error);
  }
};
