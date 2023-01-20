import { Project } from "models/Project";
import axiosClient from "utils/axiosClient";

export async function fetchGetProjects(userId: string) {
  return await axiosClient
    .get<Project[]>(`/projects`, {
      params: { userId },
    })
    .then((res) => res.data);
}

export async function fetchCreateProject(userId: string, project: Project) {
  return await axiosClient
    .post<Project>(`/projects`, {
      userId,
      project,
    })
    .then((res) => res.data);
}

export async function fetchUpdateProject(
  userId: string,
  projectId: string,
  documentId: string,
  pageId: string,
  content: string
) {
  return await axiosClient
    .put<Project>(`/projects`, {
      userId: userId,
      projectId: projectId,
      documentId: documentId,
      pageId: pageId,
      content: content,
    })
    .then((res) => res.data);
}
