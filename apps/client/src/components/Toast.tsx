import React from "react";
import { toast } from "react-toastify";
import { shallow } from "zustand/shallow";
import useStore from "$store";

const Toast = () => {
  const { message, type } = useStore(
    (state) => ({
      message: state.message,
      type: state.type,
    }),
    shallow
  );
  const clearMessage = useStore.use.clearMessage();
  const dismissLoading = useStore.use.dismissLoading();

  React.useEffect(() => {
    if (message) {
      dismissLoading();
      toast(message, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        type,
      });
      clearMessage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message]);

  return null;
};

export default Toast;
