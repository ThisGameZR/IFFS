import { Completion } from "models/Completion";
import axiosClient from "utils/axiosClient";

export async function fetchGetAnalyze(
  prompt: string,
  userId: string,
  projectId: string,
  documentId: string,
  pageId: string
) {
  return axiosClient
    .post<Completion>("/ai", {
      prompt,
      userId,
      projectId,
      documentId,
      pageId,
    })
    .then((res) => res.data);
}
