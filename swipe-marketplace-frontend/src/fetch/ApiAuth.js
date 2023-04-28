import { apiClient } from "./ApiClient";

export function exeJWTAuth(email, password) {
  const baToken = "Basic " + window.btoa(email + ":" + password);
  return apiClient.post(
    `/login`,
    {
      email,
      password,
    },
    {
      headers: {
        Authorization: baToken,
      },
    }
  );
}

export function regesterNewUser(email, name, surname, password) {
  return apiClient.post(`/register`, { email, name, surname, password });
}
