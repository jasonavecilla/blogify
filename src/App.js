import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import Homepage from "./components/Homepage/Homepage";
import Login from "./components/Users/Login";
import PublicNavbar from "./components/Navbar/PublicNavbar";
import PrivateNavbar from "./components/Navbar/PrivateNavbar";
import ProctedRoute from "./components/AuthRoute/ProctedRoute";
import AddPost from "./components/Posts/AddPost";
import PostDetails from "./components/Posts/PostDetails";
import PostLists from "./components/Posts/PostLists";
import UpdatePost from "./components/Posts/UpdatePost";
import PublicUserProfile from "./components/Users/PublicUserProfile";
import PrivateUserProfile from "./components/Users/PrivateUserProfile";
import UploadProfileImage from "./components/Users/UploadProfileImage";
import UploadCoverImage from "./components/Users/UploadCoverImage";
import AccountVerification from "./components/Users/AccountVerification";
import PasswordResetRequest from "./components/Users/PasswordResetRequest";
import PasswordReset from "./components/Users/PasswordReset";
import UpdateUser from "./components/Users/UpdateUser";
import SchedulePost from "./components/Posts/SchedulePost";
import Footer from "./components/Footer/Footer";
import RegisterUser from "./components/Users/RegisterUser";

export default function App() {
  //! Get the login user from store
  const { userAuth } = useSelector((state) => state?.users);
  const isLogin = userAuth?.userInfo?.token;
  return (
    <BrowserRouter>
      {/* Navbar here */}
      {isLogin ? <PrivateNavbar /> : <PublicNavbar />}

      <Routes>
        <Route path="" element={<Homepage />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<RegisterUser />}></Route>

        {/* profile */}
        <Route
          path="/user-public-profile/:userId"
          element={
            <ProctedRoute>
              <PublicUserProfile />
            </ProctedRoute>
          }
        ></Route>
        {/* add post */}
        <Route
          path="/add-post"
          element={
            <ProctedRoute>
              <AddPost />
            </ProctedRoute>
          }
        ></Route>

        <Route
          path="/posts/schedule/:postId"
          element={
            <ProctedRoute>
              <SchedulePost />
            </ProctedRoute>
          }
        ></Route>
        {/* post details */}
        <Route
          path="/posts/:postId"
          element={
            <ProctedRoute>
              <PostDetails />
            </ProctedRoute>
          }
        ></Route>

        <Route
          path="/update-profile"
          element={
            <ProctedRoute>
              <UpdateUser />
            </ProctedRoute>
          }
        ></Route>
        {/* forgot password request */}
        <Route
          path="/forgot-password"
          element={<PasswordResetRequest />}
        ></Route>
        {/* reset password */}
        <Route
          path="/reset-password/:token"
          element={<PasswordReset />}
        ></Route>

        {/* private user profile */}
        <Route
          path="/user-profile"
          element={
            <ProctedRoute>
              <PrivateUserProfile />
            </ProctedRoute>
          }
        ></Route>
        {/* Verify account */}
        <Route
          path="/verify-account/:token"
          element={
            <ProctedRoute>
              <AccountVerification />
            </ProctedRoute>
          }
        ></Route>

        {/* private upload profile image */}
        <Route
          path="/upload-profile-image"
          element={
            <ProctedRoute>
              <UploadProfileImage />
            </ProctedRoute>
          }
        ></Route>
        {/* private upload cover image */}
        <Route
          path="/upload-cover-image"
          element={
            <ProctedRoute>
              <UploadCoverImage />
            </ProctedRoute>
          }
        ></Route>
        {/* post details */}
        <Route
          path="/posts"
          element={
            <ProctedRoute>
              <PostLists />
            </ProctedRoute>
          }
        ></Route>

        {/* update */}
        <Route
          path="/posts/:postId/update"
          element={
            <ProctedRoute>
              <UpdatePost />
            </ProctedRoute>
          }
        ></Route>
      </Routes>
      {/* Footer */}
      <Footer />
    </BrowserRouter>
  );
}
