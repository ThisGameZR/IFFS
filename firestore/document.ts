import { db } from "./init";
import { addDoc, collection, deleteDoc, doc, getDocs, setDoc, updateDoc } from "firebase/firestore";

export const getDocumentCollections = (userId: string, projectId: string) => {
  return collection(db, "users", userId, "projects", projectId, "documents");
};

export const createDocument = async (userId: string, projectId: string, document: Document) => {
  return await addDoc(getDocumentCollections(userId, projectId), document);
};

export const updateDocumentName = async (userId: string, projectId: string, documentId: string, name: string) => {
  return await updateDoc(doc(db, "users", userId, "projects", projectId, "documents", documentId), {
    name,
  });
};

export const deleteDocument = async (userId: string, projectId: string, documentId: string) => {
  return await deleteDoc(doc(db, "users", userId, "projects", projectId, "documents", documentId));
};
