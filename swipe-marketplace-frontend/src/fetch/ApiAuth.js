import { apiClient } from "./ApiClient";

export function exeJWTAuth(username, password) {
  const baToken = "Basic " + window.btoa(username + ":" + password);
  return apiClient.post(
    `/login`,
    {
      username,
      password,
    },
    {
      headers: {
        Authorization: baToken,
      },
    }
  );
}
