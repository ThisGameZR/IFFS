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
