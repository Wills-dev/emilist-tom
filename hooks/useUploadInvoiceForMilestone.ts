import { ChangeEvent, useState } from "react";

import toast from "react-hot-toast";

import { axiosInstance } from "@/axiosInstance/baseUrl";
import { promiseErrorFunction, toastOptions } from "@/helpers";

export const useUploadInvoiceForMilestone = () => {
  const [loadInvoice, setLoadInvoice] = useState(false);
  const [rerenderrrr, setRerender] = useState(false);
  const [openInvoice, setOpenInvoice] = useState<boolean>(false);
  const [invoiceDetails, setInvoiceDetails] = useState({
    paymentMethod: "",
    bankName: "",
    accountNumber: "",
    accountName: "",
    note: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setInvoiceDetails({
      ...invoiceDetails,
      [name]: name === "milestoneAmount" ? Number(value) : value,
    });
  };

  const uploadInvoice = async (
    e: React.FormEvent<HTMLFormElement>,
    jobId: string,
    milestoneId: string,
    milestoneAmount: number
  ) => {
    e.preventDefault();

    if (!invoiceDetails.accountName) {
      return toast.error("Please enter account name", toastOptions);
    } else if (!invoiceDetails.bankName) {
      return toast.error("Please enter bank name.", toastOptions);
    } else if (!invoiceDetails.accountNumber) {
      return toast.error("Please enter account number.", toastOptions);
    } else if (!invoiceDetails.paymentMethod) {
      return toast.error("Please enter a payment method.", toastOptions);
    }
    try {
      setLoadInvoice(true);
      const { paymentMethod, bankName, accountName, accountNumber, note } =
        invoiceDetails;
      const innvoicePayload = {
        jobId,
        milestoneId,
        milestoneAmount,
        paymentMethod,
        bankName,
        accountNumber,
        accountName,
        note,
      };
      const data = await axiosInstance.post(
        `/uploadInvoiceForMilestone`,
        innvoicePayload
      );
      setOpenInvoice(false);
      toast.success(`You have successfully uploaded invoice`, toastOptions);

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
    handleChange,
    rerenderrrr,
    invoiceDetails,
    setOpenInvoice,
    openInvoice,
  };
};
