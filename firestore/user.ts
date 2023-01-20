import User from "models/User";
import { db } from "./init";
import { collection, getDocs, addDoc, doc } from "firebase/firestore";

export const getUserCollections = () => {
  return collection(db, "users");
};

export const getUsers = async () => {
  return (await getDocs(getUserCollections())).docs.map((doc) => {
    return {
      id: doc.id,
      ...doc.data(),
    } as User;
  });
};

export const createUser = async (user: User) => {
  return await addDoc(getUserCollections(), user);
};
