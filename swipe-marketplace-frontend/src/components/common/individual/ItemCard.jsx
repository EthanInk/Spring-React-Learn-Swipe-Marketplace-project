import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faCheck, faCross, faInfo, faX } from "@fortawesome/free-solid-svg-icons";

export default function ItemCard({
  showBtn = true,
  cardClickFunc,
  likeClickFunc,
  infoClickFunc,
  dislikeClickFunc,
  post = {
    images: [{
      url: "https://images.unsplash.com/photo-1552960562-daf630e9278b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    }],
    title: "Card title will be here and is clamped to 3 lines",
    price: "000",
  },
}) {
  return (
    <Card
      onClick={cardClickFunc}
      shadow={false}
      className="relative grid max-h-full h-[38rem] max-w-full w-[30rem] items-end overflow-hidden text-center"
    >
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className={`absolute inset-0 m-0 h-full w-full rounded-none bg-cover bg-center`}
        style={{ backgroundImage: `url(${post.images[0].url})` }}
      >
        <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-t from-black/80 via-black/50" />
      </CardHeader>
      <CardBody className="relative py-8 md:px-12">
        <Typography
          variant="h2"
          color="white"
          className="leading-none font-medium"
        >
          <p className="line-clamp-3 my-2 p-[0.09em]">{post.title}</p>
        </Typography>
        <Typography variant="h5" color="green" className="text-gray-400">
          R {post.price}.00
        </Typography>
        <div
          className={`flex items-center justify-between w-full ${
            showBtn ? "" : "hidden"
          }`}
        >
          <Button
            onClick={dislikeClickFunc}
            color="red"
            className="h-32 w-32 rounded-full bg-opacity-50 hover:bg-opacity-100"
            ripple={true}
          >
            <FontAwesomeIcon className="h-16 bg-opacity-100" icon={faX} />
          </Button>
          <Button
            onClick={infoClickFunc}
            className=" h-20 w-20 rounded-full bg-opacity-50 hover:bg-opacity-100"
            ripple={true}
          >
            <FontAwesomeIcon className="h-8 bg-opacity-100" icon={faInfo} />
          </Button>
          <Button
            onClick={likeClickFunc}
            color="green"
            className="h-32 w-32 rounded-full bg-opacity-50 hover:bg-opacity-100"
            ripple={true}
          >
            <FontAwesomeIcon className="h-16 bg-opacity-100" icon={faHeart} />
          </Button>
        </div>
      </CardBody>
    </Card>
  );
}
