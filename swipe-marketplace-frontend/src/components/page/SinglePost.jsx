import DetailedItemCard from "../common/individual/DetailedItemCard";
import { usePost } from "../../context/PostContext";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@material-tailwind/react";

export default function SinglePost() {
  const { id } = useParams();
  const postContext = usePost();
  const [post, setPost] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    postContext
      .getPost(id)
      .then((data) => {
        setPost(data);
      })
      .catch(() => {
        navigate(`/error`);
      });
  }, []);
  const navBack = () => navigate(-1);
  return (
    <div className="grid grid-cols-1 place-items-center">
      <Button variant="text" size="sm" onClick={navBack} className="my-2 left">Back</Button>
      {post ? <DetailedItemCard post={post}></DetailedItemCard> : "Loading..."}
    </div>
  );
}
