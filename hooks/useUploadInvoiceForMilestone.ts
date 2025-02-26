import { ChangeEvent, useState } from "react";

import toast from "react-hot-toast";

import { axiosInstance } from "@/axiosInstance/baseUrls";
import { promiseErrorFunction, toastOptions } from "@/helpers";
import { invoiceInfoType } from "@/types";
import {
  formatInputTextNumberWithCommas,
  removeCommas,
} from "@/helpers/formatInputTextNumberWithCommas";

export const useUploadInvoiceForMilestone = () => {
  const [loadInvoice, setLoadInvoice] = useState(false);
  const [rerenderrrr, setRerender] = useState(false);
  const [openInvoice, setOpenInvoice] = useState<boolean>(false);
  const [invoiceInfo, setInvoiceInfo] = useState<invoiceInfoType>({
    additionalAmount: "",
    note: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setInvoiceInfo({
      ...invoiceInfo,
      [name]:
        name === "additionalAmount"
          ? formatInputTextNumberWithCommas(value)
          : value,
    });
  };

  const uploadInvoice = async (
    e: React.FormEvent<HTMLFormElement>,
    jobId: string,
    milestoneId: string
  ) => {
    e.preventDefault();

    const { note, additionalAmount } = invoiceInfo;

    const remmoveCommasAdditionalAmount = removeCommas(additionalAmount);
    try {
      setLoadInvoice(true);

      const innvoicePayload = {
        status: "completed",
        note,
        additionalAmount: remmoveCommasAdditionalAmount,
      };
      await axiosInstance.patch(
        `/jobs/update-milestone-status/${jobId}/milestone/${milestoneId}`,
        innvoicePayload
      );
      setOpenInvoice(false);
      setInvoiceInfo({
        additionalAmount: "",
        note: "",
      });
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
    handleChange,
    invoiceInfo,
    setInvoiceInfo,
  };
};
