import { toast } from "react-toastify";

export const showErrorMessage = (message) => {
  toast.error(message, {
    pauseOnHover: true,
    position: toast.POSITION.TOP_RIGHT,
  });
};

export const showSuccessMessage = (message) => {
  toast.success(message, {
    pauseOnHover: true,
    position: toast.POSITION.TOP_RIGHT,
  });
}
