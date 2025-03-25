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

  const [paymentRerender, setRerender] = useState(false);
  const [currency, setCurrency] = useState("");
  const [loadingPayment, setLoaingPayment] = useState(false);
  const [openPaymentModal, setOpenPaymentModal] = useState(false);
  const [isAdditionalAmount, setIsAdditionalAmount] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails>({
    paymentMethod: "",
    note: "",
  });

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
        isAdditionalAmount,
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
          "https://emilist-tom.netlify.app/status?status=success"
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
    isAdditionalAmount,
    setIsAdditionalAmount,
  };
};
