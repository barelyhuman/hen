import Toastify from "toastify-js";

export const successToast = (msg) => {
  Toastify({
    text: msg,
    duration: 3000,
    gravity: "top",
    position: "right",
    style: {
      background: "black",
      color: "white",
    },
  }).showToast();
};
