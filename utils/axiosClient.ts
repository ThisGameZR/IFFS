import axios from "axios";

axios.defaults.baseURL = process.env.NEXTAPI_URL || "https://iffs.vercel.app/api"; // "http://localhost:3000/api";

axios.interceptors.request.use(
  (config) => config,
  (error) => console.log(error)
);

const axiosClient = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosClient;
