import axios from "axios";

export let apiClient = axiosCreatBase();

function axiosCreatBase() {
   const req = axios.create({
    baseURL: "http://localhost:5000",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Accept": "*/*"
    },
  })
  return req;
}

export function addAuthToken(token){
  apiClient = axiosCreatBase();
  apiClient.interceptors.request.use((config) => {
    config.headers.Authorization = token;
    return config;
  });
}

export function removeAuthToken(){
  apiClient = axiosCreatBase();
}