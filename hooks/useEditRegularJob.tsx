import React, { useContext, useState } from "react";

import toast from "react-hot-toast";

import { AuthContext } from "@/utils/AuthState";
import { axiosInstance } from "@/axiosInstance/baseUrls";
import {
  handleGoBack,
  handleInputFieldError,
  handleLoginError,
  promiseErrorFunction,
  toastOptions,
} from "@/helpers";
import { JobDetails, Milestone, TimeFrame } from "@/types";
import { validateMilestoneTimeFrames } from "@/types/validateTimeFrame";

export const useEditRegularJob = () => {
  const { currentUser } = useContext(AuthContext);

  const [loading, setLoading] = useState<boolean>(true);
  const [load, setLoad] = useState<boolean>(false);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [fetchedImages, setFetchedImages] = useState<any>([]);
  const [percentage, setPercentage] = useState<number[]>([]);
  const [selectedImageFiles, setSelectedImageFiles] = useState<File[]>([]);
  const [editJobDetails, setEditJobDetails] = useState<JobDetails>({
    title: "",
    category: "",
    service: "",
    location: "",
    description: "",
    expertLevel: "",
    duration: {
      number: 0,
      period: "days",
    },
    milestoneNumber: 0,
    milestones: [],
    budget: 0,
    bidRange: 0,
    maximumPrice: 0,
    currency: "NGN",
    achievementDetails: "",
  });

  const getJobInfo = async (jobId: string) => {
    try {
      const { data } = await axiosInstance.get(
        `/jobs/fetch-job-by-id?id=${jobId}`
      );
      const jobData = data?.data?.job;

      setEditJobDetails(jobData);
      setFetchedImages(jobData?.jobFiles);
      const milestoneLength = jobData?.milestones?.length || 0;

      setEditJobDetails((prevJob) => ({
        ...prevJob,
        milestoneNumber: milestoneLength,
      }));

      const initialPercentages = jobData.milestones.map(
        (milestone: Milestone) => (milestone.amount / jobData.budget) * 100
      );

      setPercentage(initialPercentages);
      setLoading(false);
    } catch (error: any) {
      console.log("error getting job info", error);
      toast.error("Network error", toastOptions);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setEditJobDetails((prevJob) => {
      if (name === "number" || name === "period") {
        return {
          ...prevJob,
          duration: {
            ...prevJob.duration,
            [name]: name === "number" ? parseInt(value) : value,
          },
        };
      }
      return {
        ...prevJob,
        [name]: value,
      };
    });
  };

  const handleMilestoneInputChange = (
    index: number,
    parentField: keyof Milestone,
    childField: keyof TimeFrame,
    value: any
  ) => {
    setEditJobDetails((prevJob) => {
      const newMilestones = [...prevJob.milestones];

      if (parentField === "timeFrame") {
        newMilestones[index] = {
          ...newMilestones[index],
          [parentField]: {
            ...(newMilestones[index][parentField] as TimeFrame),
            [childField]: value,
          },
        };
      }

      return {
        ...prevJob,
        milestones: newMilestones,
      };
    });
  };

  let debounceTimeout: NodeJS.Timeout;

  const validatePercentages = () => {
    const totalPercentage = percentage.reduce((sum, p) => sum + p, 0);
    if (totalPercentage > 100) {
      toast.error("Total percentage cannot exceed 100", toastOptions);
    }
  };

  // Call this function after percentage change to debounce
  const debounceValidation = () => {
    if (debounceTimeout) clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(validatePercentages, 1000);
  };

  const handlePercentageChange = (index: number, newPercentage: number) => {
    // Ensure total percentage does not exceed 100
    const totalPercentage = percentage.reduce(
      (sum, p, i) => (i === index ? sum + newPercentage : sum + p),
      0
    );
    if (totalPercentage > 100) {
      toast.error("Total percentage cannot exceed 100", toastOptions);
      return;
    }

    setPercentage((prevPercentages) => {
      const updatedPercentages = [...prevPercentages];
      updatedPercentages[index] = newPercentage;
      return updatedPercentages;
    });

    // Calculate new milestone amount based on updated percentage
    setEditJobDetails((prevJob) => {
      const updatedMilestones = [...prevJob.milestones];
      const budget = prevJob.budget ?? 0;
      updatedMilestones[index] = {
        ...updatedMilestones[index],
        amount: (newPercentage / 100) * budget,
      };
      return {
        ...prevJob,
        milestones: updatedMilestones,
      };
    });

    // Trigger the debounce for validation
    debounceValidation();
  };

  const handleMilestoneChange = (
    index: number,
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    const newMilestones = [...editJobDetails.milestones];
    newMilestones[index] = {
      ...newMilestones[index],
      [name]: name === "milestoneNumber" ? Number(value) : value,
    };
    setEditJobDetails((prevJob) => ({
      ...prevJob,
      milestones: newMilestones,
    }));
  };

  const handleMilestoneNumberChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newMilestoneNumber = Number(e.target.value);
    setEditJobDetails((prevJob) => {
      let newMilestoneDetails = [...prevJob.milestones];

      if (newMilestoneNumber > prevJob.milestoneNumber) {
        // Add new milestones
        const milestonesToAdd = newMilestoneNumber - prevJob.milestoneNumber;
        for (let i = 0; i < milestonesToAdd; i++) {
          newMilestoneDetails.push({
            timeFrame: {
              number: 0,
              period: "days",
            },
            achievement: "",
            amount: 0,
          });
        }
      } else if (newMilestoneNumber < prevJob.milestoneNumber) {
        // Remove excess milestones
        newMilestoneDetails = newMilestoneDetails.slice(0, newMilestoneNumber);
      }

      return {
        ...prevJob,
        milestoneNumber: newMilestoneNumber,
        milestones: newMilestoneDetails,
      };
    });
  };

  //onChange function for image
  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (!selectedFiles) return;

    const newImages: File[] = [...selectedImageFiles];
    for (let i = 0; i < selectedFiles.length; i++) {
      newImages.push(selectedFiles[i]);
    }

    const imagesArray: string[] = Array.from(selectedFiles).map(
      (file: File) => {
        return URL.createObjectURL(file);
      }
    );

    setSelectedImages((previousImages: string[] | undefined) =>
      previousImages ? previousImages.concat(imagesArray) : imagesArray
    );

    setSelectedImageFiles(newImages);
  };

  // Image delete function
  const handleImageDelete = (index: number) => {
    const newImages: File[] = [...selectedImageFiles];
    newImages.splice(index, 1);
    setSelectedImageFiles(newImages);
  };

  const handleErrorCheck = () => {
    if (
      !editJobDetails.category ||
      !editJobDetails.service ||
      !editJobDetails.title ||
      !editJobDetails.description ||
      !editJobDetails.duration ||
      !editJobDetails.budget ||
      !editJobDetails.location ||
      !editJobDetails.expertLevel ||
      !editJobDetails.milestoneNumber
    ) {
      return true;
    }
    return false;
  };

  const handleSubmit = async (e: React.FormEvent, jobId: string) => {
    e.preventDefault();

    const totalPercentage = percentage.reduce((sum, p) => sum + p, 0);

    if (!currentUser) {
      return handleLoginError();
    } else if (handleErrorCheck()) {
      return handleInputFieldError();
    } else if (totalPercentage > 100) {
      toast.error("Total percentage cannot exceed 100", toastOptions);
      return;
    }

    const {
      category,
      service,
      title,
      description,
      duration,
      location,
      expertLevel,
      budget,
      milestones,
      currency,
    } = editJobDetails;

    try {
      validateMilestoneTimeFrames(milestones, duration.number, duration.period);
    } catch (error: any) {
      toast.error(
        error.message || "Milestone duration validation failed",
        toastOptions
      );
      return;
    }

    const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

    if (!googleMapsApiKey) {
      throw new Error("Google Maps API key is not defined.");
    }

    if (location) {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          location
        )}&key=${googleMapsApiKey}`
      );
      const data = await response.json();

      if (data.status !== "OK") {
        toast.error(
          `Please enter a valid address from the suggestions.`,
          toastOptions
        );
        return;
      }
    }

    setLoad(true);
    try {
      const payload: any = {
        title,
        category,
        service,
        location,
        description,
        type: "regular",
        expertLevel,
        duration,
        budget,
        milestones,
        currency,
      };

      const formData = new FormData();
      formData.append("category", payload.category);
      formData.append("service", payload.service);
      formData.append("title", payload.title);
      formData.append("description", payload.description);
      formData.append("duration[number]", payload.duration.number);
      formData.append("duration[period]", payload.duration.period);
      formData.append("location", payload.location);
      formData.append("expertLevel", payload.expertLevel);
      formData.append("currency", payload.currency);
      formData.append("type", "regular");
      formData.append("budget", payload.budget);

      payload.milestones.forEach((milestone: any, index: number) => {
        formData.append(
          `milestones[${index}][timeFrame][number]`,
          milestone.timeFrame.number
        );
        formData.append(
          `milestones[${index}][timeFrame][period]`,
          milestone.timeFrame.period
        );
        formData.append(
          `milestones[${index}][achievement]`,
          milestone.achievement
        );
        formData.append(`milestones[${index}][amount]`, milestone.amount);
      });

      for (let i = 0; i < selectedImageFiles.length; i++) {
        formData.append("files", selectedImageFiles[i]);
      }

      await axiosInstance.put(`/jobs/update-job/${jobId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success(`Job edited successfully `, toastOptions);
      handleGoBack();
    } catch (error: any) {
      console.log("error editing regular job", error);
      promiseErrorFunction(error);
    } finally {
      setLoad(false);
    }
  };

  return {
    editJobDetails,
    loading,
    load,
    getJobInfo,
    handleInputChange,
    handleMilestoneChange,
    handleMilestoneNumberChange,
    handleSubmit,
    setEditJobDetails,
    handleMilestoneInputChange,
    fetchedImages,
    onSelectFile,
    selectedImages,
    setSelectedImages,
    handleImageDelete,
    handlePercentageChange,
    debounceValidation,
    percentage,
  };
};
