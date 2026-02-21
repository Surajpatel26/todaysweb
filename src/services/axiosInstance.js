import axios from "axios";
import QueryString from "qs";

let loaderHandler = null;

// 👇 Register loader from context
export const registerLoaderHandler = (handler) => {
  loaderHandler = handler;
};

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: "http://localhost:5001",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});


// Response interceptor — hide loader
axiosInstance.interceptors.response.use(
  (response) => {
    if (loaderHandler) loaderHandler.hideLoader();
    return response;
  },
  (error) => {
    if (loaderHandler) loaderHandler.hideLoader();
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error.response?.data || error.message);
  }
);

// ---------------- API Helpers ----------------
export const apiGet = async (url, params = {}, token = null) => {
  try {
    const queryString = QueryString.stringify(params, { encode: false });
    const fullUrl = queryString ? `${url}?${queryString}` : url;
    const config = {};
    if (token) config.headers = { Authorization: `Bearer ${token}` };

    const response = await axiosInstance.get(fullUrl, config);
    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

export const apiPost = async (url, data, token = null) => {
  try {
    const config = {};
    if (token) config.headers = { Authorization: `Bearer ${token}` };

    const response = await axiosInstance.post(url, data, config);
    return response.data;
  } catch (error) {
    console.error("API POST Error:", error);
    return { success: false, error: error };
  }
};

export const apiPut = async (url, data, token = null) => {
  try {
    const config = {};
    if (token) config.headers = { Authorization: `Bearer ${token}` };

    const response = await axiosInstance.put(url, data, config);
    return response.data;
  } catch (error) {
    console.error("API PUT Error:", error);
    throw error;
  }
};


export const apiDelete = async (url, data = {}, token = null) => {
  try {
    const config = {};
    if (token) config.headers = { Authorization: `Bearer ${token}` };

    const response = await axiosInstance.delete(url, {
      ...config,
      data: data // For DELETE requests with body
    });
    return response.data;
  } catch (error) {
    console.error("API DELETE Error:", error);
    throw error;
  }
};




export default axiosInstance;