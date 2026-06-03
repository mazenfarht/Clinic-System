import { toast, ToastOptions } from "react-toastify";

const defaultOptions: ToastOptions = {
  position: "top-right",
  autoClose: 2500,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  theme: "light",
  style: {
    borderRadius: "12px",
    fontSize: "14px",
  },
};

// Base function (DRY principle)
const showToast = (
  type: "success" | "error" | "warning" | "info",
  msg: string
) => {
  toast[type](msg, defaultOptions);
};

// SUCCESS
export const notifySuccess = (msg: string) => {
  showToast("success", msg);
};

// ERROR
export const notifyError = (msg: string) => {
  showToast("error", msg);
};

// WARNING
export const notifyWarning = (msg: string) => {
  showToast("warning", msg);
};

// INFO
export const notifyInfo = (msg: string) => {
  showToast("info", msg);
};
