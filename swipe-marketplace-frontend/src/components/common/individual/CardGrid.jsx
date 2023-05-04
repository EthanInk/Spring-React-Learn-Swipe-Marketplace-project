import { useNavigate } from "react-router-dom";
import ItemCard from "./ItemCard";
import PropTypes from "prop-types";

// eslint-disable-next-line react/prop-types
export default function CardGrid({ posts }) {
  const navigate = useNavigate();

  // eslint-disable-next-line react/prop-types
  const cards = [];
  posts.forEach((post) => {
    const viewCard = () => {
      navigate(`/posts/${post.id}`);
    };
    cards.push(
      <ItemCard key={post.id} showBtn={false} cardClickFunc={viewCard} post={post} />
    );
  });
  return <div className="grid grid-flow-row grid-cols-3 gap-2">{cards}</div>;
}

CardGrid.propTypes = {
  posts: PropTypes.array,
};