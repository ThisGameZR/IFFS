import { Page } from "models/Project";
import axiosClient from "utils/axiosClient";

export async function fetchCreatePage(userId: string, projectId: string, documentId: string, page: Page) {
  return await axiosClient
    .post<Page>(`/page`, {
      userId,
      projectId,
      documentId,
      page,
    })
    .then((res) => res.data);
}

export async function fetchUpdatePage(
  userId: string,
  projectId: string,
  documentId: string,
  pageId: string,
  name?: string,
  content?: string
) {
  return await axiosClient
    .put<Page>(`/page`, {
      userId: userId,
      projectId: projectId,
      documentId: documentId,
      pageId: pageId,
      name: name,
      content: content,
    })
    .then((res) => res.data);
}

export async function fetchDeletePage(userId: string, projectId: string, documentId: string, pageId: string) {
  return await axiosClient
    .delete<Page>(`/page`, {
      data: { userId, projectId, documentId, pageId },
    })
    .then((res) => res.data);
}
