import React, { useContext, useState } from "react";

import toast from "react-hot-toast";

import { AuthContext } from "@/utils/AuthState";
import { axiosInstance } from "@/axiosInstance/baseUrl";
import {
  handleGoBack,
  handleInputFieldError,
  handleLoginError,
  promiseErrorFunction,
  toastOptions,
} from "@/helpers";
import { JobRegular } from "@/types";

export const useEditRegularJob = () => {
  const { currentUser } = useContext(AuthContext);

  const [loading, setLoading] = useState<boolean>(true);
  const [load, setLoad] = useState<boolean>(false);
  const [bidRange, setBidRange] = useState(0);
  const [maxPrice, setMaxPrice] = useState("");
  const [editJobDetails, setEditJobDetails] = useState<JobRegular>({
    jobTitle: "",
    Category: "",
    service: "",
    Location: "",
    Description: "",
    expertLevel: "",
    projectDuration: "",
    milestoneNumber: 0,
    milestoneDetails: [],
    Amount: 0,
  });

  const getJobInfo = async (jobId: string) => {
    try {
      const data = await axiosInstance.get(`/get_regular_job_info/${jobId}`);
      setEditJobDetails(data?.data);
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      console.log(error);
      if (error?.response?.data?.detail) {
        return toast.error(`${error?.response?.data?.detail}`, {
          duration: 4000,
          style: {
            background: "#353434",
            color: "#fff",
          },
        });
      } else if (error.message) {
        return toast.error(`${error.message}`, {
          duration: 4000,
          style: {
            background: "#353434",
            color: "#fff",
          },
        });
      } else {
        return toast.error(`Internal Server Error!`, {
          duration: 4000,
          style: {
            background: "#353434",
            color: "#fff",
          },
        });
      }
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setEditJobDetails((prevJob) => ({
      ...prevJob,
      [name]: value,
    }));
  };

  const handleMilestoneChange = (
    index: number,
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    const newMilestones = [...editJobDetails.milestoneDetails];
    newMilestones[index] = {
      ...newMilestones[index],
      [name]: name === "milestoneNumber" ? Number(value) : value,
    };
    setEditJobDetails((prevJob) => ({
      ...prevJob,
      milestoneDetails: newMilestones,
    }));
  };

  const handleMilestoneNumberChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newMilestoneNumber = Number(e.target.value);
    setEditJobDetails((prevJob) => {
      let newMilestoneDetails = [...prevJob.milestoneDetails];

      if (newMilestoneNumber > prevJob.milestoneNumber) {
        // Add new milestones
        const milestonesToAdd = newMilestoneNumber - prevJob.milestoneNumber;
        for (let i = 0; i < milestonesToAdd; i++) {
          newMilestoneDetails.push({
            milestoneId: "",
            milestoneNumber: 0,
            milestoneDuration: "",
            milestoneAmount: 0,
            milestoneStatus: "Pending",
          });
        }
      } else if (newMilestoneNumber < prevJob.milestoneNumber) {
        // Remove excess milestones
        newMilestoneDetails = newMilestoneDetails.slice(0, newMilestoneNumber);
      }

      return {
        ...prevJob,
        milestoneNumber: newMilestoneNumber,
        milestoneDetails: newMilestoneDetails,
      };
    });
  };

  const handleErrorCheck = () => {
    if (
      !editJobDetails.Category ||
      !editJobDetails.service ||
      !editJobDetails.jobTitle ||
      !editJobDetails.Description ||
      !editJobDetails.projectDuration ||
      !editJobDetails.Amount ||
      !editJobDetails.Location ||
      !editJobDetails.expertLevel ||
      !editJobDetails.milestoneNumber
    ) {
      return true;
    }
    return false;
  };

  const updatedMilestoneDetails = editJobDetails?.milestoneDetails?.map(
    (item) => ({
      ...item,

      milestoneAmount: item.milestoneAmount.toString(),
    })
  );

  console.log("updatesd", updatedMilestoneDetails);

  const handleSubmit = async (e: React.FormEvent, jobId: string) => {
    e.preventDefault();
    if (!currentUser) {
      return handleLoginError();
    } else if (handleErrorCheck()) {
      return handleInputFieldError();
    }
    setLoad(true);
    try {
      const {
        Category,
        service,
        jobTitle,
        Description,
        projectDuration,
        Location,
        expertLevel,
        milestoneNumber,
        Amount,
      } = editJobDetails;

      const editDetails: any = {
        jobTitle,
        category: Category,
        service,
        location: Location,
        description: Description,
        maxPrice,
        bidRange,
        jobType: "regular",
        expertLevel,
        projectDuration,
        jobStatus: "pending",
        milestoneNumber,
        amount: Amount.toString(),
        milestoneDetails: updatedMilestoneDetails,
      };

      await axiosInstance.put(`/editJob/${jobId}`, editDetails);
      toast.success(`Job edit successfully `, toastOptions);
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
  };
};
