import { Project } from "./Project";

interface User {
  id?: string;
  name?: string;
  email?: string;
  projects?: Project[];
}

export default User;
