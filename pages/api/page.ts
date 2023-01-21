import { createPage, updatePage } from "firestore/page";
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
    const userId = req.body.userId as string;
    const projectId = req.body.projectId as string;
    const documentId = req.body.documentId as string;
    const pageId = req.body.pageId as string;
    const content = req.body.content as string;
    const updatedProject = await updatePage(userId, projectId, documentId, pageId, content);
    return res.status(200).json(updatedProject);
  }
  return res.status(404).json("Not Found");
}
