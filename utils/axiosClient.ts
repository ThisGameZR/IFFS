import axios from "axios";
import { toast } from "react-hot-toast";

axios.defaults.baseURL = process.env.NEXTAPI_URL || "https://iffs.vercel.app/api"; // "http://localhost:3000/api";

const axiosClient = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.request.use(
  (config) => config,
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  (config) => config,
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

export default axiosClient;
