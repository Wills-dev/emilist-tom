import { useRouter } from "next/navigation";
import { ChangeEvent, FormEventHandler, useContext, useState } from "react";

import toast from "react-hot-toast";

import { RegisterType } from "@/types";
import {
  createAuthCookie,
  promiseErrorFunction,
  toastOptions,
} from "@/helpers";
import { AuthContext } from "@/utils/AuthState";
import { axiosInstance } from "@/axiosInstance/baseUrl";

export const useSignUp = () => {
  const router = useRouter();
  const { setCurrentUser } = useContext(AuthContext);

  const [loading, setLoading] = useState<boolean>(false);
  const [inputType, setInputType] = useState<"text" | "password">("password");
  const [registerDetails, setRegisterDetails] = useState<RegisterType>({
    email: "",
    userName: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRegisterDetails({ ...registerDetails, [e.target.name]: e.target.value });
  };

  const handleRegisterUser: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (
      !registerDetails.email ||
      !registerDetails.password ||
      !registerDetails.userName
    ) {
      return toast.error("Please fill all input fields", toastOptions);
    } else if (registerDetails.password.length < 6) {
      return toast.error("Password can't be less than 6", toastOptions);
    }
    setLoading(true);
    try {
      const data =
        await axiosInstance.post(`/signup?email=${registerDetails.email}&username=${registerDetails.userName}&password=${registerDetails.password}
      `);

      //   localStorage.setItem("sessionId", data.data.session_id);
      //   localStorage.setItem("token", data.data.access_token);
      //   localStorage.setItem("user", JSON.stringify(data?.data?.user));
      createAuthCookie("sessionId", data.data.session_id);
      createAuthCookie("authToken", data.data.access_token);
      createAuthCookie("user", data?.data?.user);
      setCurrentUser(data?.data?.user);
      toast.success(`Registration successful`, toastOptions);
      setRegisterDetails({
        email: "",
        userName: "",
        password: "",
      });
      router.push("/dashboard/jobs");
    } catch (error: any) {
      console.log(error);
      promiseErrorFunction(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    handleChange,
    handleRegisterUser,
    registerDetails,
    loading,
    setInputType,
    inputType,
  };
};
