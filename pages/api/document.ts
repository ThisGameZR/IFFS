import { createDocument, updateDocumentName } from "firestore/document";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  if (req.method === "GET") {
  }
  if (req.method === "POST") {
    const { userId, projectId, document } = req.body;
    const newDocument = await createDocument(userId, projectId, document);
    return res.status(200).json(newDocument);
  }
  if (req.method === "PUT") {
    const { userId, projectId, documentId, name } = req.body;
    const updatedDocument = await updateDocumentName(userId, projectId, documentId, name);
    return res.status(200).json(updatedDocument);
  }
  return res.status(404).json("Not Found");
}
