import { useRouter } from "next/navigation";
import { useContext, useState } from "react";

import toast from "react-hot-toast";

import { ContractType } from "@/types";
import { AuthContext } from "@/utils/AuthState";

import { axiosInstance } from "@/axiosInstance/baseUrl";
import { promiseErrorFunction, toastOptions } from "@/helpers";

export const useCloseContract = () => {
  const router = useRouter();

  const { currentUser } = useContext(AuthContext);

  const [contractRerender, setRerender] = useState(false);
  const [loadingContract, setLoaingContract] = useState(false);
  const [openContractModal, setOpenContractModal] = useState(false);
  const [rateServiceProvider, setRateServiceProvider] = useState(0);
  const [rateServiceRendered, setRateServiceRendered] = useState(0);
  const [contractDetails, setContractDetails] = useState<ContractType>({
    recommendVendor: "Yes",
    review: "",
  });

  const handleContractChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setContractDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const onCancel = () => {
    setOpenContractModal(false);
  };

  const closeContract = async (
    e: React.FormEvent<HTMLFormElement>,
    jobId: string,
    noOfMilestones: number | string,
    budget: number | string,
    sumOfAmountPaidForAllMilestone: number
  ) => {
    e.preventDefault();
    if (!currentUser) {
      router.push("/login");
      return;
    }
    const { review, recommendVendor } = contractDetails;
    if (!review || !recommendVendor) {
      toast.error(`Please fill all fields`, toastOptions);
      return;
    }
    setLoaingContract(true);
    try {
      const contractData = {
        jobId,
        noOfMilestones,
        budget,
        sumOfAmountPaidForAllMilestone,
        recommendVendor,
        rateServiceProvider,
        rateServiceRendered,
        review,
      };
      await axiosInstance.post(`/closeContract`, contractData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      toast.success(`Contract closed successfully`, toastOptions);
      setRerender((prev) => !prev);
      setOpenContractModal(false);
    } catch (error: any) {
      console.log("error closing job contract", error);
      promiseErrorFunction(error);
    } finally {
      setLoaingContract(false);
    }
  };
  return {
    closeContract,
    loadingContract,
    contractRerender,
    onCancel,
    contractDetails,
    handleContractChange,
    openContractModal,
    setOpenContractModal,
    setRateServiceRendered,
    setRateServiceProvider,
    rateServiceProvider,
    rateServiceRendered,
  };
};
