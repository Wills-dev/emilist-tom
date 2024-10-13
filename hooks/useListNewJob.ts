import { useRouter } from "next/navigation";
import { ChangeEvent, FormEventHandler, useContext, useState } from "react";

import toast from "react-hot-toast";

import { AuthContext } from "@/utils/AuthState";
import { MilestonePer, PostJobType } from "@/types";
import { axiosInstance } from "@/axiosInstance/baseUrl";
import {
  handleLoginError,
  handleInputFieldError,
  toastOptions,
  promiseErrorFunction,
} from "@/helpers";

export const useListNewJob = () => {
  const router = useRouter();
  const { currentUser } = useContext(AuthContext);

  const [loading, setLoading] = useState<boolean>(false);
  const [postJobDetails, setPostJobDetails] = useState<PostJobType>({
    category: "",
    service: "",
    projectTitle: "",
    description: "",
    projectDuration: "",
    projectDurationType: "day",
    maximumPrice: "",
    bidRange: "",
    budget: "",
    location: "",
    expertLevel: "Level 4 & Above",
    milestonesNumber: 1,
  });
  const [projectType, setProjectType] = useState<"biddable" | "regular">(
    "biddable"
  );

  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [selectedImageFiles, setSelectedImageFiles] = useState<File[]>([]);

  const [milestonesData, setMilestonesData] = useState<MilestonePer[]>([
    {
      id: "",
      duration: "",
      durationType: "day",
      details: "",
      amount: 0,
      milestoneStatus: "ongoing",
      percentage: 0,
    },
  ]);

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
          (postJobDetails.maximumPrice || postJobDetails.budget)
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
    const limit =
      projectType === "biddable"
        ? postJobDetails.maximumPrice
        : postJobDetails.budget;

    if (totalAmount !== limit) {
      return false;
    } else return true;
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setPostJobDetails({
      ...postJobDetails,
      [name]:
        name === "milestonesNumber" ||
        name === "maximumPrice" ||
        name === "budget"
          ? Number(value)
          : value,
    });

    // Adjust the number of milestones if milestoneNumber changes
    if (name === "milestonesNumber") {
      const newMilestoneNumber = Math.max(1, parseInt(value, 10) || 1);
      const newMilestones = [...milestonesData];
      while (newMilestones.length < newMilestoneNumber) {
        newMilestones.push({
          id: "",
          duration: "",
          durationType: "day",
          details: "",
          amount: 0,
          milestoneStatus: "ongoing",
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
      !postJobDetails.category ||
      !postJobDetails.service ||
      !postJobDetails.projectTitle ||
      !postJobDetails.description ||
      !postJobDetails.projectDuration ||
      !postJobDetails.maximumPrice ||
      !postJobDetails.bidRange ||
      !postJobDetails.location ||
      !postJobDetails.expertLevel ||
      !postJobDetails.milestonesNumber
    ) {
      return true;
    }
    return false;
  };

  //modified milestone data to suit what's expected on the backend
  const transformedData = milestonesData.map((milestone, index) => ({
    [`milestoneId`]: milestone.id,
    [`milestoneDuration`]: `${milestone.duration} ${
      Number(milestone.duration) > 1
        ? milestone.durationType + "s"
        : milestone.durationType
    }`,
    [`milestoneDescription`]: milestone.details,
    [`milestoneAmount`]: milestone.amount,
    [`milestoneStatus`]: milestone.milestoneStatus,
  }));

  const handleErrorCheckForRegular = () => {
    if (
      !postJobDetails.category ||
      !postJobDetails.service ||
      !postJobDetails.projectTitle ||
      !postJobDetails.description ||
      !postJobDetails.projectDuration ||
      !postJobDetails.budget ||
      !postJobDetails.location ||
      !postJobDetails.expertLevel ||
      !postJobDetails.milestonesNumber
    ) {
      return true;
    }
    return false;
  };

  function handleMilestoneFieldError() {
    return toast.error("Please fill all milestone fields.", toastOptions);
  }

  function handleMilestoneDurationError() {
    return toast.error(
      "Total milestones duration can't exceed project duration!",
      toastOptions
    );
  }

  function handleImageSelectionError() {
    return toast.error("Please select an image file", toastOptions);
  }

  const handleSubmitPostJob: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const projectDuration = {
      durationNumber: postJobDetails?.projectDuration,
      durationType: postJobDetails?.projectDurationType,
    };

    const isValid = validateMilestoneDuration(projectDuration, milestonesData);

    if (!currentUser) {
      return handleLoginError();
    } else if (projectType === "biddable" && handleErrorCheck()) {
      return handleInputFieldError();
    } else if (projectType === "regular" && handleErrorCheckForRegular()) {
      return handleInputFieldError();
    } else if (isAllMilestoneFilled()) {
      return handleMilestoneFieldError();
    } else if (!isValid) {
      return handleMilestoneDurationError();
    } else if (selectedImages.length === 0 || selectedImageFiles.length === 0) {
      return handleImageSelectionError();
    } else if (
      !validateMilestoneAmounts(milestonesData) &&
      projectType === "biddable"
    ) {
      return toast.error(
        "Total milestone amount can't exceed or be below max price",
        toastOptions
      );
    } else if (
      !validateMilestoneAmounts(milestonesData) &&
      projectType === "regular"
    ) {
      return toast.error(
        "Total milestone amount can't exceed or be below budget",
        toastOptions
      );
    } else {
      setLoading(true);
      try {
        const {
          category,
          service,
          projectTitle,
          description,
          projectDuration,
          projectDurationType,
          maximumPrice,
          bidRange,
          location,
          expertLevel,
          milestonesNumber,
          budget,
        } = postJobDetails;

        //project duration
        const properProjectDuration = `${projectDuration} ${
          Number(projectDuration) > 1
            ? projectDurationType + "s"
            : projectDurationType
        }`;

        if (projectType === "biddable") {
          const postJobDetails: any = {
            jobTitle: projectTitle,
            category: category,
            service: service,
            location: location,
            description: description,
            maxPrice: maximumPrice,
            bidRange: bidRange,
            jobType: "biddable",
            expertLevel: expertLevel,
            projectDuration: properProjectDuration,
            jobStatus: "pending",
            milestoneNumber: milestonesNumber,
            milestoneDetails: JSON.stringify(transformedData),
            userId: currentUser?.unique_id,
            applicants: "[]",
            invoice: "[]",
          };

          const formData = new FormData();

          for (const property in postJobDetails) {
            formData.append(property, postJobDetails[property]);
          }

          for (let i = 0; i < selectedImageFiles.length; i++) {
            formData.append("files", selectedImageFiles[i]);
          }

          await axiosInstance.post(`/biddable`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          toast.success(`Job posted successfully `, toastOptions);
          setLoading(false);
          setPostJobDetails({
            category: "",
            service: "",
            projectTitle: "",
            description: "",
            projectDuration: "",
            projectDurationType: "",
            maximumPrice: "",
            bidRange: "",
            location: "",
            budget: "",
            expertLevel: "Level 4 & Above",
            milestonesNumber: 1,
          });
          setSelectedImageFiles([]);
          setSelectedImages([]);
          setMilestonesData([
            {
              id: "",
              duration: "",
              durationType: "Day",
              details: "",
              amount: "",
              milestoneStatus: "ongoing",
              percentage: 0,
            },
          ]);
          router.push("/dashboard/job/my-listed-jobs");
        } else if (projectType === "regular") {
          const postJobDetails: any = {
            jobTitle: projectTitle,
            category: category,
            service: service,
            location: location,
            description: description,
            amount: budget,
            jobType: "regular",
            expertLevel: expertLevel,
            projectDuration: properProjectDuration,
            jobStatus: "pending",
            milestoneNumber: milestonesNumber,
            milestoneDetails: JSON.stringify(transformedData),
            userId: currentUser?.unique_id,
            applicants: "[]",
            invoice: "[]",
          };

          const formData = new FormData();

          for (const property in postJobDetails) {
            formData.append(property, postJobDetails[property]);
          }

          for (let i = 0; i < selectedImageFiles.length; i++) {
            formData.append("files", selectedImageFiles[i]);
          }

          await axiosInstance.post(`/regular`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });

          toast.success(`Job posted successfully`, toastOptions);
          setLoading(false);
          setPostJobDetails({
            category: "",
            service: "",
            projectTitle: "",
            description: "",
            projectDuration: "",
            projectDurationType: "",
            maximumPrice: "",
            bidRange: "",
            location: "",
            budget: "",
            expertLevel: "Level 4 & Above",
            milestonesNumber: 1,
          });
          setSelectedImageFiles([]);
          setSelectedImages([]);
          setMilestonesData([
            {
              id: "",
              duration: "",
              durationType: "day",
              details: "",
              amount: "",
              milestoneStatus: "ongoing",
              percentage: 0,
            },
          ]);
          router.push("/dashboard/job/my-listed-jobs");
        }
      } catch (error: any) {
        setLoading(false);
        console.log("error listing new job", error);
        promiseErrorFunction(error);
      }
    }
  };

  return {
    onSelectFile,
    handleImageDelete,
    handleChange,
    milestonesData,
    postJobDetails,
    setPostJobDetails,
    handleSubmitPostJob,
    loading,
    // handleInputChange,
    selectedImages,
    setSelectedImages,
    projectType,
    setProjectType,
    updateMilestonesData,
  };
};
