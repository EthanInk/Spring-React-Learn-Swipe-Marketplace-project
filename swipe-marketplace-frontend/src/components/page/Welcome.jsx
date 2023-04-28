import { Typography } from "@material-tailwind/react";
import { useSearchParams } from "react-router-dom";

export default function Welcom() {
  const [searchParams] = useSearchParams();
  const message = searchParams.get("msg");
  return (
    <div className="py-16">
      <Typography variant="h1" className="text-center">
        Welcome!
      </Typography>
      <Typography variant="h3" className="text-center">
        {message}
      </Typography>
    </div>
  );
}
