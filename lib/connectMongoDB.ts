import mongoose from "mongoose";

const connectMongoDB = async function () {
  try {
    await mongoose.set("strictQuery", true);
    const conn = await mongoose.connect(
      "mongodb+srv://thanhnhantran1501:nqpMapXzSAGYO6EG@cluster0.5impujc.mongodb.net/lessy?retryWrites=true&w=majority"
    );
    console.log(conn.connection.host);
  } catch (e) {
    console.log(e);
  }
};

connectMongoDB();

export default connectMongoDB;
