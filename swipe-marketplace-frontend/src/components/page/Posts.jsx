import { useEffect, useState } from "react";
import { usePost } from "../../context/PostContext";
import { Button, button } from "@material-tailwind/react";

export default function Posts() {
  const postContext = usePost();
  const [data] = useState({});

  async function get() {
    postContext
      .getOwnAds()
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (<Button onClick={()=>get()}>Click</Button>);
}
