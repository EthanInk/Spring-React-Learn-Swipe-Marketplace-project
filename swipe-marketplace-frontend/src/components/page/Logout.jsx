import { useAuth } from "../../context/AuthContext";
import { Typography } from "@material-tailwind/react";
import { useEffect } from "react";

export default function Logout() {
  const authContext = useAuth();

  useEffect(() => {
    authContext.logout();
  });

  return (
    <div className="py-16">
      <Typography variant="h1" className="text-center">
        Logged out
      </Typography>
      <Typography variant="h3" className="text-center">
        You have been logged out
      </Typography>
    </div>
  );
}
