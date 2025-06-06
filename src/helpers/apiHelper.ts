import axios from "axios";


// Ensure environment variables are loaded
const baseURL = import.meta.env.VITE_API_BASE_URL;

export const axiosApi = axios.create();

axiosApi.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("token")}`;
axiosApi.defaults.baseURL = baseURL;

console.log({baseURL});

export async function get(url: string, data = {}) {
  return await axiosApi
    .get(url, { ...data })
    .then((response) => {
      return response.data.data;
    })
    .catch((err) => {
      if (err.response?.status == 401) {
        localStorage.removeItem("token")
        localStorage.removeItem("authUser")
        window.location.href = `/`;
      }
      return Promise.reject(err.response?.data);
    });
}
export async function post(url: string, data = {}) {
  return axiosApi
    .post(url, { ...data })
    .then((response) => response.data)
    .catch((err) => {
      if (err.response?.status == 401) {
        localStorage.removeItem("token")
        localStorage.removeItem("authUser")
        window.location.href = `/`;
      }
      return Promise.reject(err.response?.data);
    });
}

export async function put(url: string, data = {}) {
  return axiosApi
    .put(url, { ...data })
    .then((response) => response.data)
    .catch((err) => {
      if (err.response?.status == 401) {
        localStorage.removeItem("token")
        localStorage.removeItem("authUser")
        window.location.href = `/`;
      }
      console.log(err);
      return Promise.reject(err.response?.data);
    }); //
}

export async function del(url: string, data = {}) {
  return await axiosApi
    .delete(url, { ...data })
    .then((response) => response.data)
    .catch((err) => {
      if (err.response?.status == 401) {
        localStorage.removeItem("token")
        localStorage.removeItem("authUser")
        window.location.href = `/`;
      }
      return Promise.reject(err.response?.data);
    });
}
