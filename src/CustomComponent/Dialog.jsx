import { toast } from "react-toastify";


export const SuccessToast=(msg) => {
    toast.success(msg, {
      position:"top-center",
      autoClose: 2000, // Auto-close the toast after 5000 milliseconds (5 seconds)
      hideProgressBar: false, // Show the progress bar
      className: "custom-toast", // Custom class for styling
    });
}

export const AlertToast=(msg) => {
    toast.warn(msg, {
      position:"top-center",
      autoClose: 2000, // Auto-close the toast after 5000 milliseconds (5 seconds)
      hideProgressBar: false, // Show the progress bar
      className: "custom-toast", // Custom class for styling
    });
}



export const ErrorToast = (msg) => {
    toast.error(msg, {
      position:"top-center",
      autoClose: 2000, // Auto-close the toast after 5000 milliseconds (5 seconds)
      hideProgressBar: false, // Show the progress bar
      className: "custom-toast", // Custom class for styling
    });
  };