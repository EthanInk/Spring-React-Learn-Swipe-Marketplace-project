import { addAuthToken, apiClient } from "./ApiClient";

export function exeJWTAuth(email, password) {
  const baToken = "Basic " + window.btoa(email + ":" + password);
  addAuthToken(baToken);
  console.log(apiClient.defaults);
  return apiClient.post(`/login`, {
    email,
    password,
  });
}

export function regesterNewUser(email, name, surname, password) {
  return apiClient.post(`/register`, { email, name, surname, password });
}

export function chechAuth() {
  return apiClient.get("/authed");
}

export function getOwnDetails() {
  return apiClient.get("/api/v1/account");
}

export function updateOwnDetails(name, surname) {
  return apiClient.patch("/api/v1/account", { name, surname });
}
