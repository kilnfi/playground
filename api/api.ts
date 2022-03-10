import axios, { AxiosError, Method } from "axios";
import { env } from "../config/env";

// Fetcher function used by SWR by default to make requests on our API
export const fetcher = (url: string) => {
  return axios
    .get(
      `${env.API_URL}${url}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      }
    )
    .then(res => res.data)
    .catch((err) => errorHandler(err));
};

// Error handler used by SWR fetch requests
export const errorHandler = (err: AxiosError) => {
  throw new Error(err.message);
};

// API wrapper function used to make POST, PUT and PATCH requests
const api = async <T>(method: Method, url: string, data?: any): Promise<T> => {
  const res = await axios({
    method,
    url: `${env.API_URL}${url}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    data,
  });
  return res.data;
};

export default api;
