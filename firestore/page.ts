import { Page } from "models/Project";
import { db } from "./init";
import { addDoc, collection, doc, getDocs, setDoc, updateDoc } from "firebase/firestore";

export const getPageCollections = (userId: string, projectId: string, documentId: string) => {
  return collection(db, "users", userId, "projects", projectId, "documents", documentId, "pages");
};

export const createPage = async (userId: string, projectId: string, documentId: string, page: Page) => {
  return await addDoc(getPageCollections(userId, projectId, documentId), page);
};

export const updatePage = async (
  userId: string,
  projectId: string,
  documentId: string,
  pageId: string,
  content: string
) => {
  return await updateDoc(doc(db, "users", userId, "projects", projectId, "documents", documentId, "pages", pageId), {
    content: content,
  });
};
