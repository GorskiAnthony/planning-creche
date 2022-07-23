import { toast } from "react-toastify";
const options = {
  position: "bottom-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  theme: "colored",
  icon: false,
  progress: undefined,
};

const success = (message) => {
  toast.success(message, options);
};

const info = (message) => {
  toast.info(message, options);
};

const error = (message) => {
  toast.error(message, options);
};

const warning = (message) => {
  toast.warning(message, options);
};

export { success, info, error, warning };
