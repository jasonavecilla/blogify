import React, { useState } from "react";
import { AiOutlineLock } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { passwordResetAction } from "../../redux/slices/users/usersSlices";
import { useParams } from "react-router-dom";
import LoadingComponent from "../Alert/LoadingComponent";
import SuccesMsg from "../Alert/SuccesMsg";
import ErrorMsg from "../Alert/ErrorMsg";

export const PasswordReset = () => {
  // Get the reset token from params
  const { token } = useParams();
  //! Dispatch
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    password: "",
  });
  //handle form change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  //handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    //!dispatch
    dispatch(
      passwordResetAction({
        password: formData.password,
        resetToken: token,
      })
    );
    // reset form
    setFormData({
      password: "",
    });
  };
  //store data
  const { loading, error, success } = useSelector((state) => state?.users);

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center justify-center min-h-screen bg-gray-50"
    >
      <div className="w-96 p-6 bg-white rounded-xl shadow-md">
        <h1 className="text-3xl font-bold text-gray-700 text-center mb-6">
          Reset your password
        </h1>
        {success && (
          <SuccesMsg message="Password Reset Was successful, login with yiur new password" />
        )}

        {error && <ErrorMsg message={error?.message} />}
        <div className="mb-4 relative">
          <AiOutlineLock className="absolute text-gray-500 text-2xl top-2 left-2" />
          <input
            name="password"
            value={formData.password}
            onChange={handleChange}
            type="password"
            placeholder="Enter your new password"
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
        {loading ? (
          <LoadingComponent />
        ) : (
          <button className="w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none">
            Reset Password
          </button>
        )}
      </div>
    </form>
  );
};

export default PasswordReset;
