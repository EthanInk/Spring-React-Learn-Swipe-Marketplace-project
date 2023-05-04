import { usePost } from "../../context/PostContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ItemCard from "../common/individual/ItemCard";
import { Button } from "@material-tailwind/react";

function SearchPosts() {
  const postContext = usePost();
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPostsForUser();
  }, []);

  function getPostsForUser() {
    postContext
      .getPosts(0, 10, "")
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }

  const viewCard = () => {
    navigate(`/posts/${posts[0].id}`);
  };

  const likeCard = () => {
    postContext.likePost(posts[0].id);
    setPosts([...posts.slice(1)]);
  };
  const dislikeCard = () => {
    postContext.dislikePost(posts[0].id);
    setPosts([...posts.slice(1)]);
  };

  return (
    <div className="grid grid-cols-1 place-items-center my-4">
      {posts.length === 0 && loading ? (
        <>
          <p>Loading...</p>
        </>
      ) : (
        ""
      )}
      {posts.length === 0 && !loading ? (
        <>
          <p>No more posts to view...</p>
          <Button onClick={getPostsForUser}>Refresh</Button>
        </>
      ) : (
        ""
      )}
      {posts.length !== 0 ? (
        <ItemCard
          post={posts[0]}
          likeClickFunc={likeCard}
          dislikeClickFunc={dislikeCard}
          infoClickFunc={viewCard}
        ></ItemCard>
      ) : (
        ""
      )}
    </div>
  );
}

export default SearchPosts;
