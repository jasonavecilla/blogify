import React from "react";
import Swal from "sweetalert2";
const SuccesMsg = ({ message }) => {
  Swal.fire({
    icon: "success",
    title: "Good Job",
    text: message,
  });
};

export default SuccesMsg;
