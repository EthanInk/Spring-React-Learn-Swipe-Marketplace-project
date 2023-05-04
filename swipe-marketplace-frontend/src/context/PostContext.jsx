import { createContext, useContext } from "react";
import { postAd, getOwnPosts, getSinglePost, getAllPosts, likeAPost, dislikeAPost, getLikedPosts, getDislikedPosts } from "../fetch/ApiPosts";
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
      return Promise.reject("Posting new add failed");
    } catch (error) {
      console.log(error);
      return Promise.reject("Posting new add failed");
    }
  }

  async function getOwnAds() {
    try {
      const response = await getOwnPosts();
      if (response.status === 200) {
        return Promise.resolve(response.data);
      }
      return Promise.reject("Get own failed");
    } catch (error) {
      console.log(error);
      return Promise.reject("Get own  failed");
    }
  }

  async function getPost(id) {
    try {
      const response = await getSinglePost(id);
      if (response.status === 200) {
        return Promise.resolve(response.data);
      }
      return Promise.reject("Get single post failed");
    } catch (error) {
      console.log(error);
      return Promise.reject("Get single post failed");
    }
  }

  async function getPosts(pageNumber, pageSize, tags) {
    try {
      const response = await getAllPosts(pageNumber, pageSize, tags);
      if (response.status === 200) {
        return Promise.resolve(response.data);
      }
      return Promise.reject("Get all posts failed");
    } catch (error) {
      console.log(error);
      return Promise.reject("Get all posts failed");
    }
  }

  async function getLiked(pageNumber, pageSize, tags) {
    try {
      const response = await getLikedPosts(pageNumber, pageSize, tags);
      if (response.status === 200) {
        return Promise.resolve(response.data);
      }
      return Promise.reject("Get all posts failed");
    } catch (error) {
      console.log(error);
      return Promise.reject("Get all posts failed");
    }
  }
  async function getDisliked(pageNumber, pageSize, tags) {
    try {
      const response = await getDislikedPosts(pageNumber, pageSize, tags);
      if (response.status === 200) {
        return Promise.resolve(response.data);
      }
      return Promise.reject("Get all posts failed");
    } catch (error) {
      console.log(error);
      return Promise.reject("Get all posts failed");
    }
  }

  async function likePost(id){
    try {
      const response = await likeAPost(id);
      if (response.status === 200) {
        return Promise.resolve("Like success");
      }
      return Promise.reject("Like failed");
    } catch (error) {
      console.log(error);
      return Promise.reject("Like failed");
    }
  }
  async function dislikePost(id){
    try {
      const response = await dislikeAPost(id);
      if (response.status === 200) {
        return Promise.resolve("Like success");
      }
      return Promise.reject("Dislike failed");
    } catch (error) {
      console.log(error);
      return Promise.reject("Dislike failed");
    }
  }


  return (
    <PostContext.Provider value={{ postNewAd, getOwnAds, getPost, getPosts, likePost, dislikePost, getLiked, getDisliked }}>
      {children}
    </PostContext.Provider>
  );
}

PostProvider.propTypes = {
  children: PropTypes.node,
};
