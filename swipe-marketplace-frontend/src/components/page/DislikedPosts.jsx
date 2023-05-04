import { Typography } from "@material-tailwind/react";
import CardGrid from "../common/individual/CardGrid";
import { useEffect, useState } from "react";
import { usePost } from "../../context/PostContext";

function LikedPosts() {
  const postContext = usePost();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPostsForUser();
  }, []);

  function getPostsForUser() {
    postContext
      .getDisliked(0, 10, "")
      .then((data) => {
        setPosts(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <div className="p-4">
      <Typography variant="h1">Your Disliked posts</Typography>
      {posts.length === 0 ? "No disliked posts" : <CardGrid posts={posts}></CardGrid>}
    </div>
  );
}

export default LikedPosts;
