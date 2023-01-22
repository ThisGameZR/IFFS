import { createPage, deletePage, updatePage } from "firestore/page";
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
    const name = req.body.name;
    const content = req.body.content;
    const updatedProject = await updatePage(userId, projectId, documentId, pageId, name, content);
    return res.status(200).json(updatedProject);
  }
  if (req.method === "DELETE") {
    const { userId, projectId, documentId, pageId } = req.body;
    const deletedPage = await deletePage(userId, projectId, documentId, pageId);
    return res.status(200).json(deletedPage);
  }
  return res.status(404).json("Not Found");
}
