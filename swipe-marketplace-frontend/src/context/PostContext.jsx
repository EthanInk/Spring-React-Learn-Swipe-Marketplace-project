import { createContext, useContext } from "react";
import { postAd, getOwnPosts } from "../fetch/ApiPosts";
import PropTypes from "prop-types";
const PostContext = createContext();

export const usePost = () => useContext(PostContext);

export default function PostProvider({ children }) {
  async function postNewAd(title, description, address, images, price, tags) {
    try {
      const response = await postAd(title, description, address, images, price, tags);
      if (response.status === 200) {
        return Promise.resolve("Post created");
      }
      return Promise.reject("Posting failed");
    } catch (error) {
      console.log(error);
      return Promise.reject("Posting failed");
    }
  }

  async function getOwnAds() {
    try {
      const response = await getOwnPosts();
      if (response.status === 200) {
        return Promise.resolve("Post created");
      }
      return Promise.reject("Posting failed");
    } catch (error) {
      console.log(error);
      return Promise.reject("Posting failed");
    }
  }


  return (
    <PostContext.Provider value={{ postNewAd, getOwnAds }}>
      {children}
    </PostContext.Provider>
  );
}

PostProvider.propTypes = {
  children: PropTypes.node,
};
