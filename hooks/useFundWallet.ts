import { ChangeEvent, useState } from "react";

import toast from "react-hot-toast";

import { axiosInstance } from "@/axiosInstance/baseUrls";
import { promiseErrorFunction, toastOptions } from "@/helpers";
import { useRouter } from "next/navigation";

export const useFundWallet = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [walletInfo, setWalletInfo] = useState<any>({});
  const [paymentProof, setPaymentProof] = useState<any>(null);
  const [fundInfo, setFundInfo] = useState({
    amount: "",
    paymentMethod: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFundInfo({
      ...fundInfo,
      [name]: name === "amount" ? Number(value) : value,
    });
  };

  const handleDelete = () => {
    setPaymentProof(null);
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
      setPaymentProof(file);
    }
  }

  const handleFundWallet = async () => {
    if (!fundInfo.amount) {
      toast.error("Enter amount", toastOptions);
      return;
    }
    if (!fundInfo.paymentMethod) {
      toast.error("Select payment method", toastOptions);
      return;
    }
    setLoading(true);
    try {
      const payload = {
        currency: walletInfo?.currency,
        walletId: walletInfo?._id,
        amount: fundInfo.amount,
        paymentMethod: fundInfo?.paymentMethod,
      };

      const formData = new FormData();

      formData.append("currency", payload.currency);
      formData.append("walletId", payload.walletId);
      formData.append("amount", payload.amount);
      formData.append("paymentMethod", payload.paymentMethod);

      if (paymentProof) {
        formData.append("image", paymentProof);
      }

      const { data } = await axiosInstance.post(
        "/wallet/initiate-wallet-funding",
        formData
      );

      const { paymentLink, transaction } = data?.data;

      if (payload.paymentMethod === "Card" && paymentLink) {
        router.push(paymentLink);
      }
      console.log("data", data);
      if (payload.paymentMethod === "BankTransfer") {
        toast.success(
          "Your funds will reflect on your wallet once payment is confirmed.",
          toastOptions
        );
      }
      setFundInfo({
        amount: "",
        paymentMethod: "",
      });
      setWalletInfo({});
      setPaymentProof(null);
    } catch (error) {
      console.log("error funding wallet ", error);
      promiseErrorFunction(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    handleChange,
    handleFundWallet,
    loading,
    walletInfo,
    setWalletInfo,
    paymentProof,
    fundInfo,
    handleChangeFile,
    handleDelete,
  };
};
