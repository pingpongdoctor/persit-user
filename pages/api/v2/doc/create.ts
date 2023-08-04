import { NextApiRequest, NextApiResponse } from "next";
import { connectMongoDB, disconnectMongoDB } from "@/lib/connectMongoDB";

import { NoteModel } from "@/lib/schemas";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectMongoDB();

  if (req.method === "POST") {
    try {
      const { userId, projectId, title, description } = req.body;

      try {
        const result = await NoteModel.create({
          userId,
          projectId,
          title,
          description,
        });
        res
          .status(200)
          .json({ message: "Note created successfully...", result });
      } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error creating Note..." });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Internal Server Error..." });
    }
  } else {
    console.log("method not allowed");
    res.status(405).json({
      message: "Unable to send " + req.method + " request to server...",
    });
  }
  await disconnectMongoDB();
}
