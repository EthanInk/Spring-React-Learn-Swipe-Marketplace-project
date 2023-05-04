import {
  faMessage,
  faArrowLeft,
  faArrowRight,
  faLocation,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import { useState } from "react";

export default function DetailedItemCard({
  post = {
    title: "Title here",
    description: "Description here",
    address: "Cape Town",
    postedAt: "Posted at time",
    price: "0000",
    images: [],
    tags: [],
    postedBy: {
      name: "Seller name",
      surname: "Seller surname",
    },
  },
}) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const nextImage = () => {
    if((currentImageIndex + 1) >= post.images.length) return;
    setCurrentImageIndex((currentImageIndex + 1));
  };
  const prevImage = () => {
    if(currentImageIndex <= 0) return;
    setCurrentImageIndex((currentImageIndex - 1));
  };
  return (
    <Card className="w-96 my-6 relative">
      <CardHeader color="black" className="relative h-72">
        <img
          src={post.images[currentImageIndex].url}
          className="h-full w-full object-cover"
        />
      </CardHeader>
      <CardBody className="text-center">
      <span className="absolute z-50 -top-5 right-5 bg-white rounded-full overflow-visible p-1 ring-1 ring-black py-0 text-black">
          <p className="text-sm">{`${(currentImageIndex+1)} of ${post.images.length}`}</p>
        </span>
        <button onClick={prevImage} className="absolute z-50 top-24 left-2 bg-white rounded-full overflow-visible p-1 ring-1 ring-black">
          <FontAwesomeIcon className="px-1" icon={faArrowLeft} />
        </button>
        <button onClick={nextImage} className="absolute z-50 top-24 right-2 bg-white rounded-full overflow-visible p-1 ring-1 ring-black">
          <FontAwesomeIcon className="px-1" icon={faArrowRight} />
        </button>
        <Typography variant="h3" className="mb-2">
          {post.title}
        </Typography>
        <Typography variant="h5" className="mb-2">
          R {post.price}.00
        </Typography>
        <Typography>{post.description}</Typography>
      </CardBody>
      <CardFooter divider className="flex items-center justify-between py-3">
        <Typography>
          <Typography variant="small">Posted By: </Typography>
          {post.postedBy.name} {post.postedBy.surname}
        </Typography>
        <IconButton color="green">
          <FontAwesomeIcon className="px-1" icon={faMessage} />
        </IconButton>
      </CardFooter>
      <CardFooter divider className="flex items-center justify-between py-3">
        <Typography variant="small">{post.postedAt}</Typography>
        <div className="flex items-center">
          <FontAwesomeIcon className="px-1" icon={faLocation} />
          <Typography variant="small" color="gray" className="flex gap-1">
            {post.address}
          </Typography>
        </div>
      </CardFooter>
    </Card>
  );
}
