import Swal from "sweetalert2";

const defaultOptions = {
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toastElement) => {
    toastElement.onmouseenter = Swal.stopTimer;
    toastElement.onmouseleave = Swal.resumeTimer;
  },
};

export const notify = (options = {}) =>
  Swal.fire({
    ...defaultOptions,
    ...options,
  });
