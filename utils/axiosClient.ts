import axios from "axios";
import { toast } from "react-hot-toast";

axios.defaults.baseURL = process.env.NEXTAPI_URL || "http://localhost:3000/api";

axios.interceptors.request.use(
  (config) => config,
  (error) => {
    toast.error(error);
  }
);

const axiosClient = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosClient;
