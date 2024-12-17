import { useRouter } from "next/navigation";
import { useContext, useState } from "react";

import toast from "react-hot-toast";

import { AuthContext } from "@/utils/AuthState";
import { axiosInstance } from "@/axiosInstance/baseUrls";
import { promiseErrorFunction, toastOptions } from "@/helpers";

interface PaymentDetails {
  paymentMethod: string;
  note?: string;
}

export const useConfirmPayment = () => {
  const router = useRouter();

  const { currentUser } = useContext(AuthContext);

  // const [file, setFile] = useState<any>({});
  const [paymentRerender, setRerender] = useState(false);
  // const [currentFile, setCurrentFile] = useState<any>(null);
  const [currency, setCurrency] = useState("");
  const [loadingPayment, setLoaingPayment] = useState(false);
  const [openPaymentModal, setOpenPaymentModal] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails>({
    paymentMethod: "",
    note: "",
  });

  // const handleImageDelete = () => {
  //   setCurrentFile(null);
  //   setFile("");
  // };

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

  // function handleChangeFile(event: any) {
  //   const file = event.target.files[0];
  //   if (file) {
  //     if (file.size > 2 * 1024 * 1024) {
  //       toast.error(
  //         "File size exceeds 2MB. Please select a smaller file.",
  //         toastOptions
  //       );
  //       return;
  //     }
  //     setFile(file);
  //     setCurrentFile(URL.createObjectURL(file));
  //   }
  // }

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
    const { paymentMethod, note } = paymentDetails;
    if (!paymentMethod) {
      toast.error(`Please select payment method`, toastOptions);
      return;
    }
    if (!currency) {
      toast.error("Please select currency", toastOptions);
      return;
    }
    setLoaingPayment(true);
    try {
      const paymentData = {
        jobId,
        milestoneId,
        currency,
        paymentMethod,
        note,
      };

      const { data } = await axiosInstance.post(
        `/jobs/pay-for-job`,
        paymentData
      );
      const { paymentLink } = data?.data;
      if (paymentData.paymentMethod === "Card" && paymentLink) {
        router.push(paymentLink);
      }

      if (
        paymentData.paymentMethod === "Wallet" &&
        data?.message === "success"
      ) {
        router.push(
          "https://emilist-tom.netlify.app/dashboard/transactions/status?status=success"
        );
      }
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
    currency,
    setCurrency,
  };
};
