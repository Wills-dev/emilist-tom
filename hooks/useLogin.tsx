import { useRouter } from "next/navigation";
import { FormEventHandler, useContext, useState } from "react";

import toast from "react-hot-toast";

import { axiosInstance } from "@/axiosInstance/baseUrls";
import {
  createAuthCookie,
  promiseErrorFunction,
  toastOptions,
} from "@/helpers";
import { AuthContext } from "@/utils/AuthState";

export const useLogin = () => {
  const router = useRouter();

  const { setCurrentUser } = useContext(AuthContext);

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [inputType, setInputType] = useState<"text" | "password">("password");

  const handleLogin: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (!password || !email) {
      return toast.error("Please fill all input fields.", toastOptions);
    }
    setLoading(true);
    try {
      const loginPayload = {
        email,
        password,
      };
      const { data } = await axiosInstance.post(`/auth/login`, loginPayload);
      setCurrentUser(data?.data?.userData);
      createAuthCookie("sessionId", data.data.token);
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
