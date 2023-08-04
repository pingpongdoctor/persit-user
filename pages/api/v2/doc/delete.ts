import { connectMongoDB, disconnectMongoDB } from "@/lib/connectMongoDB";
import { NextApiRequest, NextApiResponse } from "next";
import { NoteModel } from "@/lib/schemas";

// DELETE endpoint
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectMongoDB();

  const { id } = req.body;
  if (req.method === "DELETE") {
    try {
      const result = await NoteModel.findOneAndDelete({ id: id?.toString() });
      res
        .status(200)
        .json({ message: "Note deleted successfully...", data: result });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Error deleting Note..." });
    }
  } else {
    console.log("method not allowed");
    res.status(405).json({
      message: "Unable to send " + req.method + " request to server...",
    });
  }
  await disconnectMongoDB();
}
