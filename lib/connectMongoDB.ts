import mongoose from "mongoose";
const uri =
  "mongodb+srv://thanhnhantran1501:nqpMapXzSAGYO6EG@cluster0.5impujc.mongodb.net/lessy?retryWrites=true&w=majority";

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
