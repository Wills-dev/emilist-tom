import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

import toast from "react-hot-toast";

import { AuthContext } from "@/utils/AuthState";
import { axiosInstance } from "@/axiosInstance/baseUrl";
import { promiseErrorFunction, toastOptions } from "@/helpers";

type ProfileDetail = {
  name: string;
  phonenumber1: string;
  bio: string;
  language: string;
  gender: string;
  phonenumber2: string;
  whatsappnumber: string;
  location: string;
  email: string;
};

export const useEditProfile = () => {
  const { currentUser } = useContext(AuthContext);
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [load, setLoad] = useState(false);
  const [profileDetails, setProfileDetails] = useState<ProfileDetail>({
    name: "",
    phonenumber1: "",
    bio: "",
    location: "",
    language: "",
    phonenumber2: "",
    whatsappnumber: "",
    gender: "",
    email: "",
  });

  const [editingField, setEditingField] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState<string | number | null>(null);

  const handleEdit = (field: string, value: string | number) => {
    setEditingField(field);
    setInputValue(value);
  };

  const handleCancel = () => {
    setEditingField(null);
    setInputValue(null);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInputValue(e.target.value);
  };

  const getUser = async () => {
    const userId = currentUser.unique_id;
    setLoad(true);
    try {
      const { data } = await axiosInstance.get(`/users/${userId}`);
      setProfileDetails({
        name: data.user.name,
        phonenumber1: data.user.phonenumber1,
        bio: data.user.bio,
        location: data.user.location,
        language: data.user.language,
        phonenumber2: data.user.phonenumber2,
        whatsappnumber: data.user.whatsappnumber,
        gender: data.user.gender,
        email: data.user.email,
      });
    } catch (error: any) {
      console.log("error fetching user data", error);
      toast.error(`Internal Server Error!`, toastOptions);
    } finally {
      setLoad(false);
    }
  };

  useEffect(() => {
    getUser();
  }, [currentUser]);

  const handleUpdate = async () => {
    if (!currentUser) {
      router.push("/login");
      return;
    }
    const userId = currentUser.id;
    const updatedDetails = { ...profileDetails, [editingField!]: inputValue };
    setLoading(true);
    try {
      await axiosInstance.put(
        `/updateProfile/${userId}`,
        { [editingField!]: inputValue },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success(`Profile detail updated successfully`, toastOptions);

      setProfileDetails(updatedDetails);
      setEditingField(null);
      setInputValue(null);
    } catch (error: any) {
      console.error(error);
      promiseErrorFunction(error);
    } finally {
      setLoading(false);
    }
  };

  const renderInput = (field: string, type: string, value: string | number) => {
    if (editingField === field) {
      switch (type) {
        case "text":
          return (
            <input
              type="text"
              name={field}
              id={field}
              value={inputValue || ""}
              onChange={handleChange}
              className="outline-none h-8 border-b-1 border-green-300 w-full"
            />
          );
        case "email":
          return (
            <input
              type="email"
              name={field}
              id={field}
              value={inputValue || ""}
              onChange={handleChange}
              className="outline-none h-8 border-b-1 border-green-300  w-full"
            />
          );
        case "number":
          return (
            <input
              type="number"
              name={field}
              id={field}
              value={inputValue || ""}
              onChange={handleChange}
              className="outline-none h-8 border-b-1 border-green-300  w-full"
            />
          );
        case "textarea":
          return (
            <textarea
              name={field}
              id={field}
              value={inputValue || ""}
              onChange={handleChange}
              className="outline-none  border-b-1 border-green-300 bg-white"
            />
          );
        default:
          return null;
      }
    } else {
      return (
        <>
          <p className="h-8">{value}</p>
        </>
      );
    }
  };

  return {
    profileDetails,
    renderInput,
    handleUpdate,
    handleCancel,
    handleEdit,
    editingField,
    loading,
    load,
  };
};
