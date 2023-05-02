import { addAuthToken, apiClient } from "./ApiClient";

export function exeJWTAuth(email, password) {
  const baToken = "Basic " + window.btoa(email + ":" + password);
  addAuthToken(baToken);
  console.log(apiClient.defaults);
  return apiClient.post(
    `/login`,
    {
      email,
      password,
    }
  );
}

export function regesterNewUser(email, name, surname, password) {
  return apiClient.post(`/register`, { email, name, surname, password });
}
