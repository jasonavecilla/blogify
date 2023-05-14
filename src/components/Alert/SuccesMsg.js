import React from "react";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { resetSuccesAction } from "../../redux/slices/globalSlice/globalSlice";

const SuccesMsg = ({ message }) => {
  const dispatch = useDispatch();
  Swal.fire({
    icon: "success",
    title: "Good Job",
    text: message,
  });
  dispatch(resetSuccesAction());
};

export default SuccesMsg;
