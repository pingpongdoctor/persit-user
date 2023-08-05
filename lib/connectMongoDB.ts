import mongoose from "mongoose";
const uri =
  "mongodb+srv://platform1:<password>@dev-1.lx46a1r.mongodb.net/Eleena?retryWrites=true&w=majority";

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
