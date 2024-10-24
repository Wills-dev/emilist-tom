import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

import toast from "react-hot-toast";

import { AuthContext } from "@/utils/AuthState";
import { axiosInstance } from "@/axiosInstance/baseUrls";
import { promiseErrorFunction, toastOptions } from "@/helpers";
import { useUploadFile } from "./useUploadFile";

type ProfileDetail = {
  fullName: string;
  number1: string;
  bio: string;
  language: string;
  gender: string;
  number2: string;
  whatsAppNo: string;
  location: string;
  email: string;
};

export const useEditProfile = () => {
  const router = useRouter();
  const { currentUser } = useContext(AuthContext);
  const { loadFile, handleSubmitFile, file, isImageTrue } = useUploadFile();

  const [load, setLoad] = useState(false);
  const [loading, setLoading] = useState(false);
  const [profileImage, setProfileImage] = useState<any>({});
  const [currentImage, setCurrentImage] = useState<string>(file ? file : "");
  const [profileDetails, setProfileDetails] = useState<ProfileDetail>({
    fullName: "",
    number1: "",
    bio: "",
    location: "",
    language: "",
    number2: "",
    whatsAppNo: "",
    gender: "",
    email: "",
  });

  const [editingField, setEditingField] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState<string | number | null>(null);

  const handleEdit = (field: string, value: string | number) => {
    setEditingField(field);
    setInputValue(value);
  };

  function handleChangeFile(event: any) {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error(
          "File size exceeds 2MB. Please select a smaller file.",
          toastOptions
        );
        return;
      }
      setProfileImage(file);
      setCurrentImage(URL.createObjectURL(file));
    }
  }

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
    setLoad(true);
    try {
      const { data } = await axiosInstance.get(`/auth/current-user`);
      setProfileDetails({
        fullName: data?.data?.fullName && data?.data?.fullName,
        number1: data?.data?.number1 && data?.data?.number1,
        bio: data?.data?.bio && data?.data?.bio,
        location: data?.data?.location && data?.data?.location,
        language: data?.data?.language && data?.data?.language,
        number2: data?.data?.number2 && data?.data?.number2,
        whatsAppNo: data?.data?.whatsAppNo && data?.data?.whatsAppNo,
        gender: data?.data?.gender && data?.data?.gender,
        email: data?.data?.email && data?.data?.email,
      });
      setCurrentImage(data?.data?.profileImage && data?.data?.profileImage);
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

    const updatedDetails = { ...profileDetails, [editingField!]: inputValue };
    setLoading(true);
    if (profileImage?.name) {
      await handleSubmitFile(profileImage);
    }
    try {
      await axiosInstance.patch(`/auth/update-profile`, {
        [editingField!]: inputValue,
        profileImage: file && file,
      });

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
              className="outline-none h-8 border-b-1 border-green-300 w-full bg-white"
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
              className="outline-none h-8 border-b-1 border-green-300  w-full bg-white"
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
              className="outline-none h-8 border-b-1 border-green-300  w-full bg-white"
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
    profileImage,
    handleChangeFile,
    currentImage,
    loadFile,
    isImageTrue,
  };
};
