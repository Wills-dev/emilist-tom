import { useContext, useState } from "react";

import toast from "react-hot-toast";

import { axiosInstance } from "@/axiosInstance/baseUrls";
import { promiseErrorFunction, toastOptions } from "@/helpers";
import { AuthContext } from "@/utils/AuthState";

export const useAddBankDetails = () => {
  const { currentUser } = useContext(AuthContext);

  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [inputType, setInputType] = useState<"text" | "password">("password");
  const [bankDetails, setBankDetails] = useState<any>({
    number: currentUser?.accountDetails?.number || "",
    holdersName: currentUser?.accountDetails?.holdersName || "",
    bank: currentUser?.accountDetails?.bank || "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBankDetails({ ...bankDetails, [name]: value });
  };

  const handleSubmitBankDetails = async () => {
    setLoading(true);
    const { number, holdersName, bank, password } = bankDetails;
    try {
      const payload = {
        number,
        holdersName,
        bank,
        password,
      };
      await axiosInstance.patch(`/auth/update-account-details`, payload);
      setEdit(false);
      toast.success(`Profile detail updated successfully`, toastOptions);
    } catch (error) {
      console.log("error submiting bank details", error);
      promiseErrorFunction(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    currentUser,
    loading,
    inputType,
    setInputType,
    handleChange,
    bankDetails,
    handleSubmitBankDetails,
    edit,
    setEdit,
  };
};
