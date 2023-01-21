import { createPage } from "firestore/page";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  if (req.method === "GET") {
  }
  if (req.method === "POST") {
    const { userId, projectId, documentId, page } = req.body;
    const newPage = await createPage(userId, projectId, documentId, page);
    return res.status(200).json(newPage);
  }
  if (req.method === "PUT") {
  }
  return res.status(404).json("Not Found");
}
