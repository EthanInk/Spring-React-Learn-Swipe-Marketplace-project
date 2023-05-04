import { Typography } from "@material-tailwind/react";
import CardGrid from "../common/individual/CardGrid";
import { useEffect, useState } from "react";
import { usePost } from "../../context/PostContext";
import { useNavigate } from "react-router-dom";

function LikedPosts() {
  const postContext = usePost();
  // const navigate = useNavigate();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPostsForUser();
  }, []);

  function getPostsForUser() {
    postContext
      .getLiked(0, 10, "")
      .then((data) => {
        setPosts(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <div className="p-4">
      <Typography variant="h1">Your Liked posts</Typography>
      {posts.length === 0 ? "No liked posts" : <CardGrid posts={posts}></CardGrid>}
    </div>
  );
}

export default LikedPosts;
