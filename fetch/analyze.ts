import { Completion, Prompt } from "models/Completion";
import { Analyze } from "models/Project";
import axiosClient from "utils/axiosClient";

export async function fetchPostAnalyze(
  prompt: string,
  userId: string,
  projectId: string,
  documentId: string,
  pageId: string
) {
  return await axiosClient
    .post<Completion>("/ai", {
      prompt,
      userId,
      projectId,
      documentId,
      pageId,
    })
    .then((res) => res.data);
}

export async function fetchGetAnalyze(userId: string, projectId: string, documentId: string, pageId: string) {
  return await axiosClient
    .get<Analyze[]>("/ai", {
      params: {
        userId,
        projectId,
        documentId,
        pageId,
      },
    })
    .then((res) => {
      //@ts-ignore
      const x = res.data.sort((a, b) => a.usage.created - b.usage.created)?.[0];
      return x;
    });
}
