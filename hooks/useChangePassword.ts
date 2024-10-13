import { useRouter } from "next/navigation";
import { useContext, useState } from "react";

import toast from "react-hot-toast";

import { AuthContext } from "@/utils/AuthState";
import { axiosInstance } from "@/axiosInstance/baseUrl";
import { promiseErrorFunction, toastOptions } from "@/helpers";

interface PasswordType {
  old: string;
  new: string;
}

export const useChangePassword = () => {
  const { currentUser } = useContext(AuthContext);
  const router = useRouter();

  console.log("currentUser", currentUser);

  const [loading, setLoading] = useState(false);
  const [edit, setEdit] = useState(false);
  const [inputType, setInputType] = useState<"password" | "text">("password");
  const [inputTypee, setInputTypee] = useState<"password" | "text">("password");
  const [password, setPassword] = useState<PasswordType>({
    old: "",
    new: "",
  });

  const handlePasswordTogglee = () => {
    setInputTypee((prev) => (prev === "password" ? "text" : "password"));
  };

  const handlePasswordToggle = () => {
    setInputType((prev) => (prev === "password" ? "text" : "password"));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPassword((prevJob) => ({
      ...prevJob,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    if (!currentUser) {
      router.push("/login");
      return;
    }
    const userId = currentUser.id;
    if (!password.old) {
      toast.error(`Please enter current password`, toastOptions);
      return;
    }
    if (!password.new) {
      toast.error(`Please enter new password`, toastOptions);
      return;
    }
    setLoading(true);

    try {
      const passwordDetails = {
        old_password: password.old,
        new_password: password.new,
      };
      await axiosInstance.post(
        `/updatePassword?user_id=${userId}`,
        passwordDetails,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      toast.success(`Password chnage successfully`, toastOptions);
      setEdit(false);
    } catch (error: any) {
      console.error("error changing password", error);
      promiseErrorFunction(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    handleChange,
    handleSubmit,
    password,
    inputType,
    inputTypee,
    handlePasswordToggle,
    handlePasswordTogglee,
    setEdit,
    edit,
  };
};
