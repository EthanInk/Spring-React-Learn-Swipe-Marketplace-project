import { apiClient } from "./ApiClient";

const baseUrl = "/api/v1/posts";
export function postAd(title, description, address, images, price, tags) {
  const formData = new FormData();
  for (let i = 0; i < images.length; i++) {
    formData.append('images', images[i]);
  }
  formData.append('title', title);
  formData.append('description', description);
  formData.append('address', address);
  formData.append('price', price);
  formData.append('tags', tags);
  return apiClient.post(
    `${baseUrl}/own`,
    formData
  );
}

export function getOwnPosts() {
  return apiClient.get(`${baseUrl}/own`, {});
}
