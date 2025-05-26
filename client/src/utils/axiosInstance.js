import axios from "axios";

// https://arbazportfolio-one.vercel.app/
const axiosInstance = axios.create({
    baseURL: "https://arbazportfolio-one.vercel.app/api/v1",
});

export default axiosInstance;
