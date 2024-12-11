import { useContext, useEffect, useState } from "react";

import {
  parseISO,
  isToday,
  isYesterday,
  isThisWeek,
  differenceInWeeks,
  differenceInMonths,
  format,
} from "date-fns";

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

  const groupNotificationsByDate = () => {
    const grouped: { [key: string]: any[] } = {};

    notifications.forEach((notification: any) => {
      // Parse the notification date
      const notificationDate = parseISO(notification?.createdAt);

      let key: string;

      if (isToday(notificationDate)) {
        key = "Today";
      } else if (isYesterday(notificationDate)) {
        key = "Yesterday";
      } else if (isThisWeek(notificationDate)) {
        key = "This Week";
      } else {
        const weeksAgo = differenceInWeeks(new Date(), notificationDate);

        if (weeksAgo <= 4) {
          key = `${weeksAgo} ${weeksAgo === 1 ? "Week Ago" : "Weeks Ago"}`;
        } else {
          const monthsAgo = differenceInMonths(new Date(), notificationDate);

          if (monthsAgo <= 12) {
            key = `${monthsAgo} ${
              monthsAgo === 1 ? "Month Ago" : "Months Ago"
            }`;
          } else {
            key = format(notificationDate, "MMMM yyyy");
          }
        }
      }

      if (!grouped[key]) {
        grouped[key] = [];
      }

      grouped[key].push(notification);
    });

    return grouped;
  };

  useEffect(() => {
    getNotifications();
  }, [currentUser]);

  return {
    isLoading,
    notifications,
    groupNotificationsByDate,
  };
};
