import { useRouter } from "next/navigation";
import React, {
  ChangeEvent,
  FormEventHandler,
  useContext,
  useEffect,
  useState,
} from "react";

import toast from "react-hot-toast";

import { MilestonePer } from "@/types";
import { AuthContext } from "@/utils/AuthState";
import { axiosInstance } from "@/axiosInstance/baseUrls";
import {
  handleInputFieldError,
  handleLoginError,
  promiseErrorFunction,
  toastOptions,
} from "@/helpers";

export const useCreateDirectContract = () => {
  const router = useRouter();
  const { currentUser } = useContext(AuthContext);

  const [loading, setLoading] = useState<boolean>(false);
  const [location, setLocation] = useState<string>("");
  const [debouncedValue, setDebouncedValue] = useState<string>("");
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [selectedImageFiles, setSelectedImageFiles] = useState<File[]>([]);
  const [milestonesData, setMilestonesData] = useState<MilestonePer[]>([
    {
      duration: "",
      durationType: "day",
      details: "",
      amount: 0,
      percentage: 0,
    },
  ]);
  const [createDirectContractJob, setCreateDirectContractJob] = useState({
    invite: "",
    category: "",
    narrow: "",
    projectTitle: "",
    description: "",
    projectDuration: "",
    projectDurationType: "day",
    budget: "",
    currency: "NGN",
    expertLevel: "four",
    milestonesnumber: 1,
  });

  const updateMilestonesData = (
    value: string | number,
    index: number,
    field: keyof MilestonePer
  ) => {
    const updatedMilestones: any = [...milestonesData];
    updatedMilestones[index][field] = value;

    // Update amount based on percentage
    if (field === "percentage") {
      updatedMilestones[index].amount = parseFloat(
        (
          ((value as number) / 100) *
          Number(createDirectContractJob.budget)
        ).toFixed(2)
      );
    }

    setMilestonesData(updatedMilestones);
    validateMilestoneAmounts(updatedMilestones);
  };

  const validateMilestoneAmounts = (milestones: MilestonePer[]) => {
    const totalAmount = milestones.reduce(
      (total, milestone) => total + milestone.amount,
      0
    );
    const limit = Number(createDirectContractJob.budget);

    if (totalAmount !== limit) {
      return false;
    } else return true;
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setCreateDirectContractJob({
      ...createDirectContractJob,
      [name]:
        name === "milestonesnumber" ||
        name === "maximumPrice" ||
        name === "budget"
          ? Number(value)
          : value,
    });

    // Adjust the number of milestones if milestoneNumber changes
    if (name === "milestonesnumber") {
      const newMilestoneNumber = Math.max(1, parseInt(value, 10) || 1);
      const newMilestones = [...milestonesData];
      while (newMilestones.length < newMilestoneNumber) {
        newMilestones.push({
          duration: "",
          durationType: "day",
          details: "",
          amount: 0,
          percentage: 0,
        });
      }
      while (newMilestones.length > newMilestoneNumber) {
        newMilestones.pop();
      }
      setMilestonesData(newMilestones);
    }
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

  function validateMilestoneDuration(
    projectDuration: any,
    milestones: MilestonePer[]
  ): boolean {
    // Convert project duration to days
    let projectDurationDays: number;

    switch (projectDuration.durationType) {
      case "day":
        projectDurationDays = projectDuration?.durationNumber;
        break;
      case "week":
        projectDurationDays = projectDuration?.durationNumber * 7;
        break;
      case "month":
        projectDurationDays = projectDuration?.durationNumber * 30;
        break;
      default:
        throw new Error("Invalid project duration type");
    }

    // Calculate total duration of milestones
    let totalMilestoneDurationDays = 0;
    for (const milestone of milestones) {
      switch (milestone.durationType) {
        case "day":
          totalMilestoneDurationDays += Number(milestone?.duration);
          break;
        case "week":
          totalMilestoneDurationDays += Number(milestone?.duration) * 7;
          break;
        case "month":
          totalMilestoneDurationDays += Number(milestone?.duration) * 30;
          break;
        default:
          throw new Error("Invalid milestone duration type");
      }
    }
    // Validate total milestone duration against project duration
    if (totalMilestoneDurationDays <= projectDurationDays) {
      return true;
    } else return false;
  }

  // Check if any of the milstone required fields are empty
  const isAllMilestoneFilled = () => {
    for (const milestone of milestonesData) {
      if (
        !milestone.duration ||
        !milestone.durationType ||
        !milestone.details ||
        milestone.amount === 0
      ) {
        return true;
      }
    }
    return false;
  };

  //checking if all the fields are filled
  const handleErrorCheck = () => {
    if (
      !createDirectContractJob.invite ||
      !createDirectContractJob.category ||
      !createDirectContractJob.narrow ||
      !createDirectContractJob.projectTitle ||
      !createDirectContractJob.description ||
      !createDirectContractJob.projectDuration ||
      !createDirectContractJob.budget ||
      !location ||
      !createDirectContractJob.expertLevel ||
      !createDirectContractJob.milestonesnumber
    ) {
      return true;
    }
    return false;
  };

  //modified milestone data to suit what's expected on the backend
  const transformedData = milestonesData.map((milestone, index) => ({
    [`timeFrame`]: {
      number: Number(milestone.duration),
      period: milestone.durationType + "s",
    },
    [`achievement`]: milestone.details,
    [`amount`]: milestone.amount,
  }));

  function handleMilestoneFieldError() {
    return toast.error("Please fill all milestone fields.", toastOptions);
  }

  function handleMilestoneDurationError() {
    return toast.error(
      "Total milestones duration can't exceed project duration!",
      toastOptions
    );
  }

  useEffect(() => {
    // Set a timeout to update the debouncedValue
    const handler = setTimeout(() => {
      setDebouncedValue(createDirectContractJob?.invite);
    }, 5000); // 3 seconds debounce

    // Clear the timeout if the user types again
    return () => {
      clearTimeout(handler);
    };
  }, [createDirectContractJob?.invite]);

  useEffect(() => {
    if (debouncedValue) {
      // Make the API call whenever debouncedValue changes
      axiosInstance
        .get(`/auth/get-specific-user?user=${debouncedValue}`)
        .then((response) => {})
        .catch((error) => {
          promiseErrorFunction(error);
          console.error("Error verifying user:", error);
        });
    }
  }, [debouncedValue]);

  const handleSubmitPostJob: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const projectDuration = {
      durationNumber: createDirectContractJob?.projectDuration,
      durationType: createDirectContractJob?.projectDurationType,
    };

    const isValid = validateMilestoneDuration(projectDuration, milestonesData);

    if (!currentUser) {
      return handleLoginError();
    } else if (handleErrorCheck()) {
      return handleInputFieldError();
    } else if (isAllMilestoneFilled()) {
      return handleMilestoneFieldError();
    } else if (!location) {
      toast.error("Please enter address", toastOptions);
    } else if (!isValid) {
      return handleMilestoneDurationError();
    } else if (!validateMilestoneAmounts(milestonesData)) {
      return toast.error(
        "Total milestone amount can't exceed or be below budget",
        toastOptions
      );
    } else {
      const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

      if (!googleMapsApiKey) {
        throw new Error("Google Maps API key is not defined.");
      }
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
      setLoading(true);
      try {
        const {
          invite,
          category,
          narrow,
          projectTitle,
          description,
          projectDuration,
          projectDurationType,
          expertLevel,
          budget,
          currency,
        } = createDirectContractJob;

        //project duration
        const properProjectDuration = {
          number: Number(projectDuration),
          period: projectDurationType + "s",
        };

        const payload: any = {
          invite,
          projectTitle,
          title: projectTitle,
          category: category,
          service: narrow,
          location: location,
          description: description,
          currency: currency,
          budget: budget,
          expertLevel: expertLevel,
          duration: properProjectDuration,
          milestones: transformedData,
          achievementDetails: "gg",
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
        formData.append("budget", payload.budget);
        formData.append("type", "direct");
        formData.append("achievementDetails", payload.achievementDetails);
        formData.append("currency", payload.currency);

        const emailPattern = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

        if (emailPattern.test(payload.invite)) {
          formData.append("email", payload?.invite);
        } else {
          formData.append("userName", payload?.invite);
        }

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

        await axiosInstance.post(`/jobs/create-job`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        toast.success(`Job posted successfully `, toastOptions);
        setLoading(false);
        setCreateDirectContractJob({
          invite: "",
          category: "",
          narrow: "",
          projectTitle: "",
          description: "",
          projectDuration: "",
          projectDurationType: "",
          budget: "",
          currency: "NGN",
          expertLevel: "four",
          milestonesnumber: 1,
        });
        setLocation("");
        setSelectedImageFiles([]);
        setSelectedImages([]);
        setMilestonesData([
          {
            duration: "",
            durationType: "Day",
            details: "",
            amount: "",
            percentage: 0,
          },
        ]);
        router.push("/dashboard/job/my-listed-jobs");
      } catch (error: any) {
        setLoading(false);
        console.log("error creating direct contract", error);
        promiseErrorFunction(error);
      }
    }
  };

  return {
    onSelectFile,
    handleImageDelete,
    handleChange,
    milestonesData,
    createDirectContractJob,
    setCreateDirectContractJob,
    handleSubmitPostJob,
    loading,
    selectedImages,
    setSelectedImages,
    updateMilestonesData,
    location,
    setLocation,
  };
};
