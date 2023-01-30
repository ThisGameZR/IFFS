import { Completion, Prompt } from "models/Completion";
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
    .get<Completion[]>("/ai", {
      params: {
        userId,
        projectId,
        documentId,
        pageId,
      },
    })
    .then((res) => {
      const x = res.data.sort((a, b) => a.created - b.created)?.[0];
      try {
        //@ts-ignore
        return {
          ...x,
          //@ts-ignore
          text: JSON.parse(x.text),
        } as Completion;
      } catch (e) {
        console.log(e);
      }
    });
}
