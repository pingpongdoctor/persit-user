import type { NextApiRequest, NextApiResponse } from "next";
import { connectMongoDB, disconnectMongoDB } from "@/lib/connectMongoDB";
import { TaskModel } from "@/lib/schemas";

// All API calls to /api/v1/task hit this endpoint
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { taskId } = req.query;
  await connectMongoDB();

  if (req.method === "DELETE") {
    try {
      const result = await TaskModel.findOneAndDelete({
        id: taskId?.toString(),
      });
      return res
        .status(200)
        .json({ message: "Successfully deleted Task", data: result });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error deleting Task" });
    }
  } else if (req.method === "PATCH") {
    const { taskColumn } = req.body;
    try {
      const result = await TaskModel.updateOne(
        { id: taskId?.toString() },
        { $set: taskColumn }
      );
      return res
        .status(200)
        .json({ message: "Successfully updated taskColumn", data: result });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Error updating taskColumn" });
    }
  } else if (req.method === "GET") {
    try {
      const result = await TaskModel.find({ id: taskId?.toString() });
      return res
        .status(200)
        .json({ message: "Successfully fetched Tasks", data: result });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error fetching Tasks" });
    }
  } else {
    console.log("Method not allowed");
    res.status(405).json({
      message: "Unable to send " + req.method + " request to server...",
    });
  }
  await disconnectMongoDB();
}
