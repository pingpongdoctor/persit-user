import { connectMongoDB, disconnectMongoDB } from "@/lib/connectMongoDB";
import { NextApiRequest, NextApiResponse } from "next";
import { NoteModel } from "@/lib/schemas";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const userId = req.query.userId as string;
  await connectMongoDB();

  if (req.method === "GET") {
    try {
      try {
        const result = await NoteModel.find({ userId: userId });
        res
          .status(200)
          .json({ message: "Notes fetched successfully...", data: result });
      } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error fetching Notes..." });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Internal server error" });
    }
  } else {
    console.log("method not allowed");
    res.status(405).json({
      message: "Unable to send " + req.method + " request to server...",
    });
  }
  await disconnectMongoDB();
}
