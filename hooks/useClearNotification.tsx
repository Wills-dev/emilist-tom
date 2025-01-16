import { useState } from "react";

import { promiseErrorFunction } from "@/helpers";
import { axiosInstance } from "@/axiosInstance/baseUrls";

export const useClearNotification = () => {
  const [load, setLoad] = useState(false);
  const [rerender, setRerender] = useState(false);

  const clearNotification = async (notificationId: string) => {
    setLoad(true);
    try {
      await axiosInstance.delete(
        `/notification/clear-notification/${notificationId}`
      );
      setRerender((prev) => !prev);
    } catch (error) {
      console.log("error clearing notification", error);
      promiseErrorFunction(error);
    } finally {
      setLoad(false);
    }
  };

  return {
    load,
    rerender,
    clearNotification,
  };
};
