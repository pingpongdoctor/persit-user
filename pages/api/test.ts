import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    return res.status(200).json({
      message: "test",
    });
  }
  return res.status(500).json({
    message: "error",
  });
}
