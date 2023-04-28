import { Typography } from "@material-tailwind/react";

export default function Error() {
  return (
    <div className="py-16">
      <Typography variant="h1" className="text-center">Error</Typography>
      <Typography variant="h3" className="text-center">
        Page you are looking for does not exist
      </Typography>
    </div>
  );
}
