import { createProject, getProjects, updateProject } from "firestore/project";
import { Project } from "models/Project";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  if (req.method === "GET") {
  }
  if (req.method === "POST") {
    const userId = req.body.userId as string;
    const project = req.body.project as Project;
    const newProject = await createProject(userId, project);
    return res.status(200).json(newProject);
  }
  if (req.method === "PUT") {
    const userId = req.body.userId as string;
    const projectId = req.body.projectId as string;
    const documentId = req.body.documentId as string;
    const pageId = req.body.pageId as string;
    const content = req.body.content as string;
    const updatedProject = await updateProject(userId, projectId, documentId, pageId, content);
    return res.status(200).json(updatedProject);
  }
  return res.status(404).json("Not Found");
}
