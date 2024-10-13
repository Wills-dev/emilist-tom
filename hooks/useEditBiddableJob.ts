import { useContext, useState } from "react";

import toast from "react-hot-toast";

import { Job } from "@/types";
import { AuthContext } from "@/utils/AuthState";
import { axiosInstance } from "@/axiosInstance/baseUrl";
import {
  handleGoBack,
  handleInputFieldError,
  handleLoginError,
  promiseErrorFunction,
  toastOptions,
} from "@/helpers";

export const useEditBiddableJob = () => {
  const { currentUser } = useContext(AuthContext);

  const [loading, setLoading] = useState<boolean>(true);
  const [load, setLoad] = useState<boolean>(false);
  const [amount, setAmount] = useState(0);
  const [editJobDetails, setEditJobDetails] = useState<Job>({
    jobTitle: "",
    category: "",
    service: "",
    location: "",
    description: "",
    maxPrice: 0,
    bidRange: 0,
    expertLevel: "",
    projectDuration: "",
    milestoneNumber: 0,
    milestoneDetails: [],
  });

  const getJobInfo = async (jobId: string) => {
    try {
      const data = await axiosInstance.get(`/get_biddable_job_info/${jobId}`);
      setEditJobDetails(data?.data);
    } catch (error: any) {
      console.log("error getting biddable job info", error);
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
      !editJobDetails.category ||
      !editJobDetails.service ||
      !editJobDetails.jobTitle ||
      !editJobDetails.description ||
      !editJobDetails.projectDuration ||
      !editJobDetails.maxPrice ||
      !editJobDetails.bidRange ||
      !editJobDetails.location ||
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
        category,
        service,
        jobTitle,
        description,
        projectDuration,
        maxPrice,
        bidRange,
        location,
        expertLevel,
        milestoneNumber,
      } = editJobDetails;

      const editDetails: any = {
        jobTitle,
        category,
        service,
        location,
        description,
        maxPrice: maxPrice.toString(),
        bidRange,
        jobType: "biddable",
        expertLevel,
        projectDuration,
        jobStatus: "pending",
        milestoneNumber,
        amount: amount.toString(),
        milestoneDetails: updatedMilestoneDetails,
      };

      await axiosInstance.put(`/editJob/${jobId}`, editDetails);
      toast.success(`Job edit successfully `, toastOptions);
      handleGoBack();

      setLoad(false);
    } catch (error: any) {
      console.log("error editing biddable job", error);
      setLoad(false);
      promiseErrorFunction(error);
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
