import User from "models/User";
import axiosClient from "utils/axiosClient";

export async function fetchGetUser() {
  return await axiosClient.get("/users").then((res) => res.data);
}

export async function fetchCreateUser(user: User) {
  return await axiosClient.post("/users", { user }).then((res) => res.data);
}
