import axios from "axios";

const baseURL = process.env.NODE_ENV === 'production' 
    ? "https://portfolio-nvtm.vercel.app/api/v1"  
    : "http://localhost:5001/api/v1";

const axiosInstance = axios.create({
    baseURL,
});

export default axiosInstance;