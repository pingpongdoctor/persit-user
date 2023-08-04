import type { NextApiRequest, NextApiResponse } from "next";
import { connectMongoDB, disconnectMongoDB } from "@/lib/connectMongoDB";
import { TaskModel } from "@/lib/schemas";
import NextCors from "nextjs-cors";

// All API calls to /api/v1/project/getTasks/[projectId] hit this endpoint
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await NextCors(req, res, {
    methods: ["GET"],
    // TODO: Configure accepted origins
    origin: "*",
  });
  const { projectId } = req.query;
  await connectMongoDB();

  if (req.method === "GET") {
    try {
      const result = await TaskModel.find({ projectId: projectId?.toString() });
      if (result) {
        return res
          .status(200)
          .json({ message: " Projects found...", data: result });
      } else {
        return res.status(200).json({ message: "Projects not found..." });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal Server Error..." });
    }
  } else {
    console.log("method not allowed");
    res.status(405).json({
      message: "Unable to send " + req.method + " request to server...",
    });
  }
  await disconnectMongoDB();
}
