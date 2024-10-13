import { useRouter } from "next/navigation";
import React, { useContext, useState } from "react";

import toast from "react-hot-toast";

import { HiringDetails } from "@/types";
import { AuthContext } from "@/utils/AuthState";
import { axiosInstance } from "@/axiosInstance/baseUrl";
import { promiseErrorFunction, toastOptions } from "@/helpers";

export const useHirePrivateExpert = () => {
  const { currentUser } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [hiringDetails, setHiringDetails] = useState<HiringDetails>({
    fullName: "",
    jobType: "",
    jobDetails: "",
    location: "",
  });

  const router = useRouter();

  const handleDelete = () => {
    setSelectedImage(null);
  };

  const handleChnage = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setHiringDetails((details) => ({
      ...details,
      [name]: value,
    }));
  };

  const handleFileChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  const onCancel = () => {
    setIsOpen(false);
  };

  const handleSubmit = async () => {
    if (!currentUser) {
      router.push("/login");
    }
    const { fullName, jobType, jobDetails, location } = hiringDetails;
    setLoading(true);
    try {
      const expertData = {
        name: fullName,
        jobType,
        details: jobDetails,
        location,
        file: selectedImage,
      };
      await axiosInstance.post(`/privateexpert`, expertData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setIsOpen(false);
      toast.success(`Form submitted successfully`, toastOptions);
      setHiringDetails({
        fullName: "",
        jobType: "",
        jobDetails: "",
        location: "",
      });
      setSelectedImage(null);
    } catch (error: any) {
      console.log("error hiring private expert", error);
      promiseErrorFunction(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    handleSubmit,
    handleFileChange,
    handleChnage,
    loading,
    hiringDetails,
    selectedImage,
    setIsOpen,
    isOpen,
    onCancel,
    handleDelete,
  };
};
