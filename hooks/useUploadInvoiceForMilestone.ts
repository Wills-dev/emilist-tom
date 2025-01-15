import { ChangeEvent, useState } from "react";

import toast from "react-hot-toast";

import { axiosInstance } from "@/axiosInstance/baseUrls";
import { promiseErrorFunction, toastOptions } from "@/helpers";

export const useUploadInvoiceForMilestone = () => {
  const [loadInvoice, setLoadInvoice] = useState(false);
  const [rerenderrrr, setRerender] = useState(false);
  const [openInvoice, setOpenInvoice] = useState<boolean>(false);

  const uploadInvoice = async (
    e: React.FormEvent<HTMLFormElement>,
    jobId: string,
    milestoneId: string
  ) => {
    e.preventDefault();

    try {
      setLoadInvoice(true);

      const innvoicePayload = {
        status: "completed",
      };
      await axiosInstance.patch(
        `/jobs/update-milestone-status/${jobId}/milestone/${milestoneId}`,
        innvoicePayload
      );
      setOpenInvoice(false);
      toast.success(`Invoice sent!`, toastOptions);
      setRerender((prev) => !prev);
    } catch (error: any) {
      console.log("error uploading invoice for  milestone", error);
      promiseErrorFunction(error);
    } finally {
      setLoadInvoice(false);
    }
  };

  return {
    uploadInvoice,
    loadInvoice,
    rerenderrrr,
    setOpenInvoice,
    openInvoice,
  };
};
