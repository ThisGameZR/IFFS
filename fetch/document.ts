import { Document } from "models/Project";
import axiosClient from "utils/axiosClient";

export async function fetchCreateDocument(userId: string, projectId: string, document: Document) {
  return await axiosClient
    .post<Document>(`/document`, {
      userId,
      projectId,
      document,
    })
    .then((res) => res.data);
}

export async function fetchUpdateDocumentName(userId: string, projectId: string, documentId: string, name: string) {
  return await axiosClient
    .put<Document>(`/document`, {
      userId,
      projectId,
      documentId,
      name,
    })
    .then((res) => res.data);
}
