import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

import toast from "react-hot-toast";

import { AuthContext } from "@/utils/AuthState";
import { axiosInstance } from "@/axiosInstance/baseUrls";
import { promiseErrorFunction, toastOptions } from "@/helpers";

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

  const [load, setLoad] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showSave, setShowSave] = useState(false);
  const [profileImage, setProfileImage] = useState<any>({});
  const [currentImage, setCurrentImage] = useState<string>("");

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

  const [editingField, setEditingField] = useState<boolean>(false);

  const handleEdit = () => {
    setEditingField(true);
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
      setShowSave(true);
      setProfileImage(file);
      setCurrentImage(URL.createObjectURL(file));
    }
  }

  const handleCancel = () => {
    setEditingField(false);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setProfileDetails({ ...profileDetails, [name]: value });
  };

  const getUser = async () => {
    setLoad(true);
    try {
      const { data } = await axiosInstance.get(`/auth/current-user`);
      setProfileDetails({
        fullName: data?.data?.fullName ? data?.data?.fullName : "",
        number1: data?.data?.number1 ? data?.data?.number1 : "",
        bio: data?.data?.bio ? data?.data?.bio : "",
        location: data?.data?.location ? data?.data?.location : "",
        language: data?.data?.language ? data?.data?.language : "",
        number2: data?.data?.number2 ? data?.data?.number2 : "",
        whatsAppNo: data?.data?.whatsAppNo ? data?.data?.whatsAppNo : "",
        gender: data?.data?.gender ? data?.data?.gender : "",
        email: data?.data?.email ? data?.data?.email : "",
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

    setLoading(true);
    const {
      fullName,
      number1,
      bio,
      location,
      language,
      number2,
      whatsAppNo,
      gender,
    } = profileDetails;

    try {
      const formData = new FormData();

      if (fullName) formData.append("fullName", fullName);
      if (number1) formData.append("number1", number1);
      if (bio) formData.append("bio", bio);
      if (location) formData.append("location", location);
      if (language) formData.append("language", language);
      if (number2) formData.append("number2", number2);
      if (whatsAppNo) formData.append("whatsAppNo", whatsAppNo);
      if (gender) formData.append("gender", gender);

      formData.append("image", profileImage);

      await axiosInstance.patch(`/auth/update-profile`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success(`Profile detail updated successfully`, toastOptions);
      setEditingField(false);
      setShowSave(false);
    } catch (error: any) {
      console.error(error);
      promiseErrorFunction(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    profileDetails,
    handleUpdate,
    handleCancel,
    handleEdit,
    editingField,
    loading,
    load,
    profileImage,
    handleChangeFile,
    currentImage,
    handleChange,
    showSave,
    setProfileDetails,
  };
};
