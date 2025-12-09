import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://node-mailer-test-project-backend.vercel.app/api/v1/auth",
  withCredentials: true
});

export default axiosInstance;
