import { createProject, deleteProject, getProjects, updateProjectName } from "firestore/project";
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
    const name = req.body.name as string;
    const updatedProject = await updateProjectName(userId, projectId, name);
    return res.status(200).json(updatedProject);
  }
  if (req.method === "DELETE") {
    const userId = req.body.userId as string;
    const projectId = req.body.projectId as string;
    const deletedProject = await deleteProject(userId, projectId);
    return res.status(200).json(deletedProject);
  }
  return res.status(404).json("Not Found");
}
