import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://just-read-app.herokuapp.com/api",
});

export default axiosInstance;
