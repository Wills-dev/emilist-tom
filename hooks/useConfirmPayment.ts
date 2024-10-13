import { useRouter } from "next/navigation";
import { useContext, useState } from "react";

import toast from "react-hot-toast";

import { PaymentDetails } from "@/types";
import { AuthContext } from "@/utils/AuthState";
import { axiosInstance } from "@/axiosInstance/baseUrl";
import { promiseErrorFunction, toastOptions } from "@/helpers";

export const useConfirmPayment = () => {
  const router = useRouter();

  const { currentUser } = useContext(AuthContext);

  const [paymentRerender, setRerender] = useState(false);
  const [loadingPayment, setLoaingPayment] = useState(false);
  const [openPaymentModal, setOpenPaymentModal] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails>({
    amountpaid: "",
    paymentmethod: "",
    date: "",
  });

  const handlePaymentChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
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
    milestoneId: string
  ) => {
    e.preventDefault();
    if (!currentUser) {
      router.push("/login");
      return;
    }
    const { amountpaid, paymentmethod, date } = paymentDetails;
    if (!amountpaid || !paymentmethod || !date) {
      toast.error(`Please fill all fields`, toastOptions);
      return;
    }
    setLoaingPayment(true);
    try {
      const paymentData = {
        milestoneId,
        amountpaid,
        paymentmethod,
        date,
      };
      const data = await axiosInstance.post(`/jobPayment`, paymentData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      toast.success(`Payment details uploaded successfully `, toastOptions);
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
  };
};
