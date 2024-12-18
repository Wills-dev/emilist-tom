import { useRouter } from "next/navigation";
import React, { useContext, useState } from "react";

import toast from "react-hot-toast";

import { HiringDetails } from "@/types";
import { AuthContext } from "@/utils/AuthState";
import { axiosInstance } from "@/axiosInstance/baseUrl";
import { promiseErrorFunction, toastOptions } from "@/helpers";

interface DateTime {
  date: string; // Format: YYYY-MM-DD
  time: string; // Format: HH:MM
}

export const useHirePrivateExpert = () => {
  const { currentUser } = useContext(AuthContext);

  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [availability, setAvailability] = useState<DateTime[]>([]);

  const [hiringDetails, setHiringDetails] = useState<HiringDetails>({
    fullName: "",
    phoneNumber: "",
    email: "",
    privateExpertType: "",
    jobDetails: "",
    location: "",
  });

  const router = useRouter();

  const handleAddDate = (date: string, time: string) => {
    if (availability.length >= 3) {
      toast.error("You can only select up to 3 dates.", toastOptions);
      return;
    }

    if (availability.find((entry) => entry.date === date)) {
      toast.error("This date is already selected.", toastOptions);
      return;
    }

    setAvailability((prev) => [...prev, { date, time }]);
  };

  const handleRemoveDate = (date: string) => {
    setAvailability((prev) => prev.filter((entry) => entry.date !== date));
  };

  const handleDelete = () => {
    setSelectedImage(null);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "date" | "time",
    index: number
  ) => {
    const newValue = e.target.value;
    setAvailability((prev) =>
      prev.map((entry, i) =>
        i === index ? { ...entry, [field]: newValue } : entry
      )
    );
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
    const {
      fullName,
      phoneNumber,
      email,
      privateExpertType,
      jobDetails,
      location,
    } = hiringDetails;
    setLoading(true);
    try {
      const expertData = {
        name: fullName,
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
        phoneNumber: "",
        email: "",
        privateExpertType: "",
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
    handleAddDate,
    handleRemoveDate,
    availability,
    handleInputChange,
  };
};
