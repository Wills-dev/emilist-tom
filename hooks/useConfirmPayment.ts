import { useRouter } from "next/navigation";
import { useContext, useState } from "react";

import toast from "react-hot-toast";

import { PaymentDetails } from "@/types";
import { AuthContext } from "@/utils/AuthState";
import { axiosInstance } from "@/axiosInstance/baseUrls";
import { promiseErrorFunction, toastOptions } from "@/helpers";

export const useConfirmPayment = () => {
  const router = useRouter();

  const { currentUser } = useContext(AuthContext);

  const [file, setFile] = useState<any>({});
  const [paymentRerender, setRerender] = useState(false);
  const [currentFile, setCurrentFile] = useState<any>(null);
  const [loadingPayment, setLoaingPayment] = useState(false);
  const [openPaymentModal, setOpenPaymentModal] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails>({
    amountpaid: "",
    paymentmethod: "",
    date: "",
    note: "",
  });

  const handleImageDelete = () => {
    setCurrentFile(null);
    setFile("");
  };

  const handlePaymentChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setPaymentDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  function handleChangeFile(event: any) {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error(
          "File size exceeds 2MB. Please select a smaller file.",
          toastOptions
        );
        return;
      }
      setFile(file);
      setCurrentFile(URL.createObjectURL(file));
    }
  }

  const onCancelPayment = () => {
    setOpenPaymentModal(false);
  };

  const confirmPayment = async (
    e: React.FormEvent<HTMLFormElement>,
    milestoneId: string,
    jobId: string
  ) => {
    e.preventDefault();
    if (!currentUser) {
      router.push("/login");
      return;
    }
    const { amountpaid, paymentmethod, date, note } = paymentDetails;
    if (!amountpaid || !paymentmethod || !date) {
      toast.error(`Please fill all fields`, toastOptions);
      return;
    }
    setLoaingPayment(true);
    try {
      const paymentData = {
        jobId,
        milestoneId,
        amountpaid,
        paymentmethod,
        date,
        note,
      };

      const formData = new FormData();

      formData.append("jobId", paymentData?.jobId);
      formData.append("milestoneId", paymentData?.milestoneId);
      formData.append("amountPaid", paymentData?.amountpaid);
      formData.append("paymentMethod", paymentData?.paymentmethod);
      formData.append("date", paymentData?.date);
      formData.append("image", file);

      await axiosInstance.patch(`/jobs/update-milestone-payment`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success(`Payment status successfully `, toastOptions);
      setRerender((prev) => !prev);
      setOpenPaymentModal(false);
    } catch (error: any) {
      console.log("error confirming payment", error);
      promiseErrorFunction(error);
    } finally {
      setLoaingPayment(false);
    }
  };
  return {
    confirmPayment,
    loadingPayment,
    paymentRerender,
    onCancelPayment,
    paymentDetails,
    handlePaymentChange,
    openPaymentModal,
    setOpenPaymentModal,
    currentFile,
    handleChangeFile,
    handleImageDelete,
  };
};
