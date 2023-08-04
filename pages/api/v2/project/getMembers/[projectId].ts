import { connectMongoDB, disconnectMongoDB } from "@/lib/connectMongoDB";
import type { NextApiRequest, NextApiResponse } from "next";
import { ProjectModel } from "@/lib/schemas";

// All API calls to /api/v1/project/getMembers/[projectId] hit this endpoint
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectMongoDB();
  const projectId = req.query.projectId as string;

  if (req.method === "GET") {
    try {
      const members = await ProjectModel.findOne({
        id: projectId?.toString(), // Change 'id' to 'id' to match MongoDB's primary key field
      }).select("members");

      if (!members) {
        res.status(404).json({ message: "Members not found" });
      } else {
        console.log("Members found:", members);
        res.status(200).json({ message: "Member Ids found", data: members });
      }
    } catch (error) {
      console.error("Error fetching members:", error);
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
