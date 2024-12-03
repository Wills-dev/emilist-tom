import { useContext, useEffect, useState } from "react";

import { AuthContext } from "@/utils/AuthState";
import { axiosInstance } from "@/axiosInstance/baseUrls";

export const useGetNotification = () => {
  const { currentUser } = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const getNotifications = async () => {
    setIsLoading(true);
    try {
      const { data } = await axiosInstance.get(
        `/notification/fetch-user-notification`
      );
      setNotifications(data?.data);
      console.log("data", data);
    } catch (error) {
      console.log("error loading notification", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getNotifications();
  }, [currentUser]);

  return {
    isLoading,
    notifications,
  };
};
