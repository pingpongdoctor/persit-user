import { connectMongoDB, disconnectMongoDB } from "@/pages/_lib/connectMongoDB";
import { NextApiRequest, NextApiResponse } from "next";
import { ProjectModel } from "@/pages/_lib/schemas";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const projectId = req.query.projectId as string;
  await connectMongoDB();

  if (req.method === "GET") {
    try {
      const project = await ProjectModel.findOne({ id: projectId?.toString() });

      if (!project) {
        res.status(404).json({ message: "Project not found" });
      } else {
        console.log("Project found:", project);
        res.status(200).json({ message: "Project not found", data: project });
      }
    } catch (error) {
      console.error("Error fetching project:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  } else if (req.method === "PUT") {
    try {
      //VALUES THAT ARE NOT UNDEFINED NEED TO BE UPDATED
      const {
        name,
        tasks,
        client,
        members,
        dueDate,
        description,
        status,
        workspaceId,
        priority,
        blockers,
      } = req.body;

      interface ValuesObject {
        [index: string]: string | string[] | undefined;
      }

      const valuesObject: ValuesObject = {
        name,
        tasks,
        client,
        members,
        dueDate,
        description,
        status,
        workspaceId,
        priority,
        blockers,
      };

      const notUndefinedValuesObject: ValuesObject = {};

      for (const key in valuesObject) {
        if (valuesObject[key]) {
          notUndefinedValuesObject[key] = valuesObject[key];
        }
      }

      console.log(notUndefinedValuesObject);

      const updatedProject = await ProjectModel.findByIdAndUpdate(
        projectId?.toString(),
        notUndefinedValuesObject,
        { new: true }
      );

      if (!updatedProject) {
        res.status(200).json({ message: "Project not found" });
      } else {
        res
          .status(200)
          .json({ message: "Project updated", data: updatedProject });
      }
    } catch (error) {
      console.log(error);
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
