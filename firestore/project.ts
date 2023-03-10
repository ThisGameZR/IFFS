//@ts-nocheck
import { Project } from "models/Project";
import { db } from "./init";
import { addDoc, collection, doc, getDocs, setDoc, deleteDoc, updateDoc } from "firebase/firestore";

export const getUserCollection = (userId: string) => {
  return collection(db, "users", userId);
};

export const getProjectCollections = (userId: string) => {
  return collection(db, "users", userId, "projects");
};

export const getDocumentCollections = (userId: string, projectId: string) => {
  return collection(db, "users", userId, "projects", projectId, "documents");
};

export const getPageCollections = (userId: string, projectId: string, documentId: string) => {
  return collection(db, "users", userId, "projects", projectId, "documents", documentId, "pages");
};

export const getProjects = async (userId: string) => {
  let projects = (await getDocs(getProjectCollections(userId))).docs.map((doc) => {
    return { id: doc.id, ...doc.data() };
  }) as Project[];
  // get subcollections of projects (documents)
  projects = await Promise.all(
    projects.map(async (project) => {
      project.documents = (await getDocs(getDocumentCollections(userId, project.id!))).docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });
      return Promise.resolve(project);
    })
  );
  // get subcollections of documents (pages)
  projects = await Promise.all(
    projects.map(async (project) => {
      project.documents = await Promise.all(
        project.documents?.map(async (document) => {
          document.pages = (await getDocs(getPageCollections(userId, project.id!, document.id!))).docs.map((doc) => {
            return { id: doc.id, ...doc.data() };
          });
          return Promise.resolve(document);
        })
      );
      return Promise.resolve(project);
    })
  );
  return projects;
};

export const createProject = async (userId: string, project: Project) => {
  try {
    return await addDoc(getProjectCollections(userId), project);
  } catch (e: any) {
    console.log(e);
    return e;
  }
};

export const updateProjectName = async (userId: string, projectId: string, name: string) => {
  return await updateDoc(doc(db, "users", userId, "projects", projectId), {
    name: name,
  });
};

export const deleteProject = async (userId: string, projectId: string) => {
  return await deleteDoc(doc(db, "users", userId, "projects", projectId));
};
