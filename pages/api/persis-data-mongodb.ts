import type { NextApiRequest, NextApiResponse } from "next";
import { connectMongoDB } from "lib/connectMongoDB";
import { UserModel } from "lib/schemas";

type PostBodyPayload = {
  email: string;
  name: string;
  auth0UserId: string;
};

interface User {
  auth0UserId: string;
  email: string;
  name: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    await connectMongoDB();

    const { user } = req.body as { user: PostBodyPayload };
    const { email, name, auth0UserId } = user;

    try {
      const newUser: User = {
        auth0UserId,
        email,
        name,
      };
      const userRecord = await UserModel.findOneAndUpdate({ email }, newUser, {
        new: true,
        upsert: true,
      });

      return res.status(200).json({
        message: `User created/updated for ${user.email} (${userRecord._id})`,
      });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ message: "Error persisting user data", error });
    }
  }

  return res.status(405).end();
}
