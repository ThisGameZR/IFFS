import { getProjects } from "firestore/project";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  if (req.method === "GET") {
    const userId = req.query.userId as string;
    const projects = await getProjects(userId);
    return res.status(200).json(projects);
  }
  return res.status(404).json("Not Found");
}
