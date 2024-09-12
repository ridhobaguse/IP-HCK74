import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://valcom.ekasanjaya.my.id",
});

export default axiosInstance;
