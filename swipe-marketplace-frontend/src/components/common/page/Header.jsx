import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
import { useAuth } from "../../../context/AuthContext";

export default function Header() {
  const navigate = useNavigate();
  const authContext = useAuth();
  const [openNav, setOpenNav] = useState(false);
  const isUserAuthed = authContext.isAuthed;
  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);
  const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <a
          href=""
          onClick={() => {navigate("/posts");setOpenNav(false);}}
          className="flex items-center"
        >
          All Posts
        </a>
      </Typography>
      {isUserAuthed ? (
        <>
          <Typography
            as="li"
            variant="small"
            color="blue-gray"
            className="p-1 font-normal"
          >
            <a
              href="#"
              onClick={() => {navigate("/account");setOpenNav(false);}}
              className="flex items-center"
            >
              Account
            </a>
          </Typography>
          <Typography
            as="li"
            variant="small"
            color="blue-gray"
            className="p-1 font-normal"
          >
            <a
              href="#"
              onClick={() => {navigate("/posts/liked");setOpenNav(false);}}
              className="flex items-center"
            >
              My liked
            </a>
          </Typography>
          <Typography
            as="li"
            variant="small"
            color="blue-gray"
            className="p-1 font-normal"
          >
            <a
              href="#"
              onClick={() => {navigate("/posts/disliked");setOpenNav(false);}}
              className="flex items-center"
            >
              My disliked
            </a>
          </Typography>
          <Typography
            as="li"
            variant="small"
            color="blue-gray"
            className="p-1 font-normal"
          >
            <a
              href="#"
              onClick={() => {navigate("/logout");setOpenNav(false);}}
              className="flex items-center"
            >
              Logout
            </a>
          </Typography>
        </>
      ) : (
        <>
        <Typography
          as="li"
          variant="small"
          color="blue-gray"
          className="p-1 font-normal"
        >
          <a
            href="#"
            onClick={() => {navigate("/login");setOpenNav(false);}}
            className="flex items-center"
          >
            Login
          </a>
        </Typography>
        </>
      )}
    </ul>
  );

  return (
    <>
      <Navbar className="backdrop-blur-xl sticky inset-0 z-10 h-max max-w-full rounded-none py-2 px-4 lg:px-8 lg:py-4">
        <div className="flex items-center justify-between text-blue-gray-900">
          <Typography
            as="a"
            href="/"
            className="mr-4 cursor-pointer py-1.5 font-medium"
          >
            Swipe
          </Typography>
          <div className="flex items-center gap-4">
            <div className="mr-4 hidden lg:block">{navList}</div>
            <Button
              variant="gradient"
              size="sm"
              className="hidden lg:inline-block"
              onClick={() => {navigate("/createPost");setOpenNav(false);}}
            >
              <span>Post ad</span>
            </Button>
            <IconButton
              variant="text"
              className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
              ripple={false}
              onClick={() => setOpenNav(!openNav)}
            >
              {openNav ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </IconButton>
          </div>
        </div>
        <MobileNav open={openNav}>
          {navList}
          <Button
            onClick={() => {navigate("/createPost");setOpenNav(false);}}
            variant="gradient"
            size="sm"
            fullWidth
            className="mb-2"
          >
            <span>Post Ad</span>
          </Button>
        </MobileNav>
      </Navbar>
    </>
  );
}
