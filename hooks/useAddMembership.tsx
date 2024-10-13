import { ChangeEvent, FormEventHandler, useContext, useState } from "react";
import { useRouter } from "next/navigation";

import toast from "react-hot-toast";

import { MembershipProps } from "@/types";
import { AuthContext } from "@/utils/AuthState";
import { axiosInstance } from "@/axiosInstance/baseUrl";
import { promiseErrorFunction, toastOptions } from "@/helpers";

export const useAddMembership = () => {
  const { currentUser } = useContext(AuthContext);
  const [membershipLoading, setMemberShipLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [membershipDetails, setMembershipDetails] = useState<MembershipProps>({
    organization: "",
    position: "",
    startDate: "",
    endDate: "",
  });

  const router = useRouter();

  const onCancelModal = () => {
    setOpenModal(false);
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setMembershipDetails({
      ...membershipDetails,
      [name]: value,
    });
  };

  const handleSubmitMember: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const { organization, position, startDate, endDate } = membershipDetails;

    if (!currentUser) {
      router.push("/login");
      return;
    }
    if (!organization || !startDate || !position) {
      toast.error(`Please fill the required fields`, toastOptions);
      return;
    }
    setMemberShipLoading(true);
    try {
      const userId = currentUser?.id;

      const submitDetails = {
        organization,
        position_held: position,
        start_date: startDate,
        end_date: endDate ? endDate : "No End",
      };

      await axiosInstance.post(`/userMembership/${userId}`, submitDetails, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      toast.success(`Mmembership updated successfull`, toastOptions);
      setMembershipDetails({
        organization: "",
        position: "",
        startDate: "",
        endDate: "",
      });
      onCancelModal();
    } catch (error: any) {
      console.log("error adding membership data", error);
      promiseErrorFunction(error);
    } finally {
      setMemberShipLoading(false);
    }
  };

  return {
    handleChange,
    handleSubmitMember,
    onCancelModal,
    openModal,
    setOpenModal,
    membershipDetails,
    membershipLoading,
  };
};
