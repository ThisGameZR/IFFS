import { Analyze } from "models/Project";
import { db } from "./init";
import { addDoc, collection, deleteDoc, doc, getDocs, setDoc, updateDoc } from "firebase/firestore";

export const getAnalyzeCollections = (userId: string, projectId: string, documentId: string, pageId: string) => {
  return collection(db, "users", userId, "projects", projectId, "documents", documentId, "pages", pageId, "analyzes");
};

export const createAnalyze = async (
  userId: string,
  projectId: string,
  documentId: string,
  pageId: string,
  analyze: Analyze
) => {
  return await addDoc(getAnalyzeCollections(userId, projectId, documentId, pageId), analyze);
};
