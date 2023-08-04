import type { NextApiRequest, NextApiResponse } from "next";
import { connectMongoDB, disconnectMongoDB } from "@/lib/connectMongoDB";
import { WorkspaceModel } from "@/lib/schemas";

// All API calls to /api/v2/workspace/[workspaceId] hit this endpoint
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { workspaceId } = req.query;
  await connectMongoDB();

  if (req.method === "GET") {
    try {
      const workspaceResult = await WorkspaceModel.findOne({
        id: workspaceId?.toString(),
      });
      if (!workspaceResult) {
        res.status(404).json({ message: "Workspace not found" });
      } else {
        res.status(200).json({
          message: "Fetched workspace members",
          data: workspaceResult?.members,
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error fetching workspace members" });
    }
  } else {
    console.log("Method not allowed");
    res.status(405).json({
      message: "Unable to send " + req.method + " request to server...",
    });
  }
  await disconnectMongoDB();
}
