import Login from "./page/Login";
import PropTypes from "prop-types";
import AuthProvider, { useAuth } from "../context/AuthContext";
import PostProvider from "../context/PostContext";
import Error from "./page/Error";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "./common/page/Header";
import Register from "./page/Register";
import Welcome from "./page/Welcome";
import CreatePost from "./page/CreatePost";
import SinglePost from "./page/SinglePost";
import SearchPosts from "./page/SearchPosts";
import Logout from "./page/Logout";
import LikedPosts from "./page/LikedPosts";
import DislikedPosts from "./page/DislikedPosts";
import Account from "./page/Account";
import EditPost from "./page/EditPost";

function AuthenticatedRoute({ children }) {
  const authContext = useAuth();
  if (authContext.isAuthed) {
    return children;
  }
  return <Navigate to="/login"></Navigate>;
}

AuthenticatedRoute.propTypes = {
  children: PropTypes.node,
};

function AppMain() {
  return (
    <div>
      <AuthProvider>
        <PostProvider>
          <BrowserRouter>
            <Header />
            <Routes>
              <Route path="/" element={<Welcome></Welcome>}></Route>
              <Route path="/login" element={<Login></Login>}></Route>
              <Route path="/register" element={<Register></Register>}></Route>
              <Route path="/logout" element={<Logout></Logout>}></Route>
              <Route path="/welcome" element={<Welcome></Welcome>}></Route>
              <Route
                path="/posts"
                element={<SearchPosts></SearchPosts>}
              ></Route>
              <Route
                path="/posts/:id"
                element={<SinglePost></SinglePost>}
              ></Route>
              <Route
                path="/createPost"
                element={
                  <AuthenticatedRoute>
                    <CreatePost></CreatePost>
                  </AuthenticatedRoute>
                }
              ></Route>
              <Route
                path="/posts/liked"
                element={
                  <AuthenticatedRoute>
                    <LikedPosts></LikedPosts>
                  </AuthenticatedRoute>
                }
              ></Route>
              <Route
                path="/posts/disliked"
                element={
                  <AuthenticatedRoute>
                    <DislikedPosts></DislikedPosts>
                  </AuthenticatedRoute>
                }
              ></Route>
              <Route
                path="/posts/edit/:id"
                element={<EditPost></EditPost>}
              ></Route>
              <Route
                path="/account"
                element={
                  <AuthenticatedRoute>
                    <Account></Account>
                  </AuthenticatedRoute>
                }
              ></Route>
              <Route path="*" element={<Error></Error>}></Route>
            </Routes>
          </BrowserRouter>
        </PostProvider>
      </AuthProvider>
    </div>
  );
}

export default AppMain;
