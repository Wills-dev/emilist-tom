import Cookies from "universal-cookie";

export const createCookie = (cookieName: string, cookieValue: any): void => {
  const cookies = new Cookies();
  const expires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
  cookies.set(cookieName, cookieValue, {
    expires,
    path: "/",
    sameSite: "strict",
    secure: true,
  });
};

export const readCookie = (cookieName: string): any => {
  const cookies = new Cookies();
  return cookies.get(cookieName);
};

export const clearCookie = (cookieName: string): void => {
  const cookies = new Cookies();
  cookies.remove(cookieName, { path: "/" });
};
