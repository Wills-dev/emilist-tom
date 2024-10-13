import toast from "react-hot-toast";
import {
  format,
  differenceInHours,
  differenceInMinutes,
  differenceInDays,
  differenceInWeeks,
  differenceInMonths,
} from "date-fns";

import Cookies from "universal-cookie";

export const createAuthCookie = (
  cookieName: string,
  cookieValue: any
): void => {
  const cookies = new Cookies();
  const expires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
  cookies.set(cookieName, cookieValue, {
    expires,
    path: "/",
    sameSite: "strict",
    secure: true,
  });
};

export const readAuthCookie = (cookieName: string): any => {
  const cookies = new Cookies();
  return cookies.get(cookieName);
};

export const clearAuthClear = (cookieName: string): void => {
  const cookies = new Cookies();
  cookies.remove(cookieName, { path: "/" });
};

export const toastOptions = {
  duration: 6000,
  style: {
    background: "#353434",
    color: "#fff",
  },
};

export const promiseErrorFunction = (error: any) => {
  if (error?.response?.data?.detail[0].msg) {
    return toast.error(`${error?.response?.data?.detail[0].msg}`, toastOptions);
  } else if (error?.response?.data?.detail) {
    return toast.error(`${error?.response?.data?.detail}`, toastOptions);
  } else if (error.message) {
    return toast.error(`${error.message}`, toastOptions);
  } else {
    return toast.error(`Internal Server Error! Contact support`, toastOptions);
  }
};

export function handleInputFieldError() {
  return toast.error("Please fill all input fields.", toastOptions);
}

export function handleLoginError() {
  return toast.error("Please login", toastOptions);
}

export const Capitalize = (str: string) => {
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

export function numberWithCommas(x: number | string) {
  return x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const goBack = () => {
  window.history.back();
};

export const convertDateFormat = (oldDate: Date): string => {
  let date = new Date(oldDate).toString().split(" ");
  let newFormat = ` ${date[2]}  ${date[1]}, ${date[3]}`;
  return newFormat;
};

export const formatCreatedAt = (date: Date): string => {
  const createdAt = date;
  const now = new Date();

  const hoursDiff = differenceInHours(now, createdAt);
  const minutesDiff = differenceInMinutes(now, createdAt);
  const daysDiff = differenceInDays(now, createdAt);
  const weeksDiff = differenceInWeeks(now, createdAt);

  if (hoursDiff < 1) {
    if (minutesDiff < 1) {
      return "Just now";
    } else if (minutesDiff < 2 && minutesDiff >= 1) {
      return `${minutesDiff} m`;
    } else {
      return `${minutesDiff} m`;
    }
  } else if (hoursDiff < 24) {
    return `${hoursDiff}h`;
  } else if (daysDiff <= 7) {
    return `${daysDiff}d`;
  } else {
    return `${weeksDiff}w`;
  }
};

export function dataURLtoFile(dataUrl: string): File {
  const arr = dataUrl.split(",");
  const mime = arr[0].match(/:(.*?);/)?.[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  const fileName = "profile_picture";
  return new File([u8arr], fileName, { type: mime });
}

export const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
  if (event.key === "ArrowUp" || event.key === "ArrowDown") {
    event.preventDefault();
  }
};

export const handleWheel = (event: React.WheelEvent<HTMLInputElement>) => {
  event.target as HTMLElement;
  event.preventDefault();
};

export const showLastPathOfLink = (link: string) => {
  return link.split("/").filter(Boolean).pop();
};

export const handleGoBack = () => {
  window.history.back();
};

export const countCompleteMilestones = (milestoneDetails: any): string => {
  const totalMilestones = milestoneDetails.length;
  const completedMilestones = milestoneDetails.filter(
    (milestone: any) => milestone.milestoneStatus === "completed"
  ).length;
  return `${completedMilestones}/${totalMilestones}`;
};

export const formatStartDate = (date: Date): string => {
  return format(date, "dd/MM/yyyy");
};

export const formatDueDate = (date: any): string => {
  const dueDate = date;
  const now = new Date();

  const hoursDiff = differenceInHours(dueDate, now);
  const daysDiff = differenceInDays(dueDate, now);
  const monthsDiff = differenceInMonths(dueDate, now);
  const weeksDiff = differenceInWeeks(dueDate, now);

  if (hoursDiff < 24) {
    return `${hoursDiff} ${hoursDiff === 1 ? "hr" : "hrs"}`;
  } else if (daysDiff <= 7) {
    return `${daysDiff} ${daysDiff === 1 ? "day" : "days"}`;
  } else if (weeksDiff <= 4) {
    return `${weeksDiff} ${weeksDiff === 1 ? "week" : "weeks"}`;
  } else return `${monthsDiff} ${monthsDiff === 1 ? "month" : "months"}`;
};

export const formatOverDueDate = (date: any): string => {
  const dueDate = date;
  const now = new Date();

  const hoursDiff = differenceInHours(now, dueDate);
  const daysDiff = differenceInDays(now, dueDate);
  const monthsDiff = differenceInMonths(now, dueDate);
  const weeksDiff = differenceInWeeks(now, dueDate);

  if (hoursDiff < 24) {
    return `${hoursDiff} ${hoursDiff === 1 ? "hr" : "hrs"}`;
  } else if (daysDiff <= 7) {
    return `${daysDiff} ${daysDiff === 1 ? "day" : "days"}`;
  } else if (weeksDiff <= 4) {
    return `${weeksDiff} ${weeksDiff === 1 ? "week" : "weeks"}`;
  } else return `${monthsDiff} ${monthsDiff === 1 ? "month" : "months"}`;
};

export const combineAndSortArrays = (arr1: any, arr2: any) => {
  if (arr1.length === 0)
    return arr2.sort(
      (a: any, b: any) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  if (arr2.length === 0)
    return arr1.sort(
      (a: any, b: any) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
    );

  const combinedArray = [...arr1, ...arr2];
  return combinedArray.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
};
