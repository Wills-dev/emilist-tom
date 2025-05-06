import axios from "axios";

import { readAuthCookie } from "@/helpers";

const baseUrl = "https://emilist-be-server-05kc.onrender.com/api/v1";

export const axiosInstance = axios.create({
  //create instance
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

//set the Auth token for any request
axiosInstance.interceptors.request.use(
  function (config) {
    const token = readAuthCookie("sessionId");
    config.headers.Authorization = token ? `Bearer ${token}` : "";
    return config;
  },
  (err) => {
    throw new Error(err);
    // some action
  }
);
