import { useRouter } from "next/navigation";
import { FormEventHandler, useContext, useState } from "react";

import toast from "react-hot-toast";

import { AuthContext } from "@/utils/AuthState";
import { axiosInstance } from "@/axiosInstance/baseUrl";
import {
  createAuthCookie,
  promiseErrorFunction,
  toastOptions,
} from "@/helpers";

export const useLogin = () => {
  const router = useRouter();
  const { setCurrentUser } = useContext(AuthContext);

  const [loading, setLoading] = useState<boolean>(false);
  const [inputType, setInputType] = useState<"text" | "password">("password");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (!password || !email) {
      return toast.error("Please fill all input fields.", toastOptions);
    }
    setLoading(true);
    try {
      const data = await axiosInstance.post(
        `/login?email=${email}&password=${password}`
      );
      createAuthCookie("sessionId", data.data.session_id);
      createAuthCookie("authToken", data.data.access_token);
      createAuthCookie("emilistUser", data?.data?.user);
      setCurrentUser(data?.data?.user);
      toast.success("Login successful!", toastOptions);
      router.push("/dashboard/job");
      setEmail("");
      setPassword("");
    } catch (error: any) {
      console.log("error from login", error);
      promiseErrorFunction(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    password,
    setPassword,
    email,
    setEmail,
    loading,
    setInputType,
    inputType,
    handleLogin,
  };
};
