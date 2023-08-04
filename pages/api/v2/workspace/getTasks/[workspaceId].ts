import type { NextApiRequest, NextApiResponse } from "next";
import { connectMongoDB, disconnectMongoDB } from "@/lib/connectMongoDB";
import { ProjectModel } from "@/lib/schemas";
import { TaskModel } from "@/lib/schemas";

// All API calls to /api/v1/task hit this endpoint
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { workspaceId } = req.query;
  const projectIdArray: string[] = [];
  await connectMongoDB();
  if (req.method === "GET") {
    try {
      const projectResult = await ProjectModel.find({
        workspaceId: workspaceId?.toString(),
      });
      projectResult.map((response) => {
        projectIdArray.push(response.id);
      });
      const taskResult = await TaskModel.find({
        projectId: { $in: projectIdArray },
      });
      res.status(200).json({ message: "Fetched tasks", data: taskResult });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error getting tasks" });
    }
  } else {
    console.log("Method not allowed");
    res.status(405).json({
      message: "Unable to send " + req.method + " request to server...",
    });
  }
  await disconnectMongoDB();
}
