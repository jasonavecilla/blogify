import React, { useEffect, useState } from "react";
import { AiOutlineUser, AiOutlineMail } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import "tailwindcss/tailwind.css";
import { updateUserProfileAction } from "../../redux/slices/users/usersSlices";
import LoadingComponent from "../Alert/LoadingComponent";
import ErrorMsg from "../Alert/ErrorMsg";
import SuccesMsg from "../Alert/SuccesMsg";

const UpdateUser = () => {
  //! Dispatch
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    username: "",
  });
  //handle form change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  //handle form submit
  const handleSubmit = (e) => {
    console.log(formData);
    e.preventDefault();
    //!dispatch
    dispatch(
      updateUserProfileAction({
        username: formData.username,
        email: formData.email,
      })
    );
    // reset form
    setFormData({
      username: "",
      email: "",
    });
  };
  //store data
  const { loading, error, success, isUpdated } = useSelector(
    (state) => state?.users
  );
  useEffect(() => {
    if (isUpdated) {
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  });
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center justify-center min-h-screen bg-gray-50"
    >
      <div className="w-96 p-6 bg-white rounded-xl shadow-md">
        <h1 className="text-3xl font-bold text-gray-700 text-center mb-6">
          Update your Profile
        </h1>
        {error && <ErrorMsg message={error?.message} />}
        {isUpdated && <SuccesMsg message="Profile updated, login back again" />}
        <div className="mb-4 relative">
          <AiOutlineUser className="absolute text-gray-500 text-2xl top-2 left-2" />
          <input
            name="username"
            value={formData.username}
            onChange={handleChange}
            type="text"
            placeholder="Update your username"
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-6 relative">
          <AiOutlineMail className="absolute text-gray-500 text-2xl top-2 left-2" />
          <input
            name="email"
            value={formData.password}
            onChange={handleChange}
            type="email"
            placeholder="Update your email"
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
        {loading ? (
          <LoadingComponent />
        ) : (
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none"
          >
            Update Profile
          </button>
        )}
      </div>
    </form>
  );
};

export default UpdateUser;
