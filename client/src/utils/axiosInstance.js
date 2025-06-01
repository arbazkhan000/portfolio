import axios from "axios";

const baseURL = process.env.NODE_ENV === 'production' 
    ? "https://portfolio-nvtm.vercel.app/api/v1"  
    : "http://localhost:5001/api/v1";

const axiosInstance = axios.create({
    baseURL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000
});


axiosInstance.interceptors.request.use(
    (config) => {
        console.log(`Making ${config.method?.toUpperCase()} request to:`, config.baseURL + config.url);
        return config;
    },
    (error) => {
        console.error('Request interceptor error:', error);
        return Promise.reject(error);
    }
);


axiosInstance.interceptors.response.use(
    (response) => {
        console.log('API Response successful:', response.status);
        return response;
    },
    (error) => {
        if (error.code === 'ERR_NETWORK') {
            console.error('Network Error - Check if backend is running and CORS is configured');
        } else if (error.response?.status === 0) {
            console.error('CORS Error - Request blocked by browser');
        } else {
            console.error('API Error:', {
                status: error.response?.status,
                data: error.response?.data,
                message: error.message
            });
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;