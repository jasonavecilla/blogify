import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import Homepage from "./components/Homepage/Homepage";
import Login from "./components/Users/Login";
import UserProfile from "./components/Users/UserProfile";
import PublicNavbar from "./components/Navbar/PublicNavbar";
import PrivateNavbar from "./components/Navbar/PrivateNavbar";
import ProctedRoute from "./components/AuthRoute/ProctedRoute";
import PublicPosts from "./components/Posts/PublicPosts";

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

        {/* profile */}
        <Route
          path="/user-profile"
          element={
            <ProctedRoute>
              <UserProfile />
            </ProctedRoute>
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}
