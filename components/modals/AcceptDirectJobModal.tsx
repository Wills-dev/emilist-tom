import React, { useContext, useState } from "react";

import { Modal } from "antd";

import { AuthContext } from "@/utils/AuthState";
import Link from "next/link";
import Image from "next/image";
import toast from "react-hot-toast";
import { toastOptions } from "@/helpers";

interface AcceptDirectJobModalProps {
  isOpen: boolean;
  onCancel: () => void;
  AcceptDirectJob: (
    applicationId: string,
    status: string,
    businessId?: string
  ) => Promise<void>;
  applicationId: string;
}

const AcceptDirectJobModal = ({
  isOpen,
  onCancel,
  AcceptDirectJob,
  applicationId,
}: AcceptDirectJobModalProps) => {
  const { currentUser } = useContext(AuthContext);

  const [service, setService] = useState("");

  const acceptJob = () => {
    if (currentUser?.businesses.length === 0) {
      toast.error("Please add a business to proceed", toastOptions);
      return;
    }
    if (!service) {
      toast.error("Please select a business", toastOptions);
      return;
    }
    AcceptDirectJob(applicationId, "accepted", service);
  };

  return (
    <Modal open={isOpen} onCancel={onCancel} centered width={400} footer={null}>
      <h5 className="font-semibold text-center sm:text-lg mt-2">Accept job</h5>

      <div className="flex items-start flex-col gap-4 pt-6">
        <div className="w-full">
          <p className="text-[#5e625f] py-2  font-medium max-sm:text-sm">
            Please select business you want to accept job with
          </p>
          <div className="w-full">
            <div className="expert-reg-input-div">
              <select
                className="bg-[#ececec] outline-none  min-w-full w-full h-full max-w-full max-sm:text-sm "
                name="service"
                value={service}
                onChange={(e) => setService(e.target.value)}
              >
                {currentUser?.businesses?.length > 0 ? (
                  <option defaultValue="">Select business</option>
                ) : (
                  <option defaultValue="">No business registered</option>
                )}
                {currentUser?.businesses?.map(
                  (business: any, index: number) => (
                    <option key={index} value={business?._id}>
                      {business?.businessName}
                    </option>
                  )
                )}
              </select>
            </div>
          </div>
        </div>

        <Link href="/expert/register" className="flex-c gap-1">
          <Image
            src="/assets/icons/add.svg"
            alt="logo"
            width={20}
            height={20}
            className="object-contain w-6 h-6 max-sm:w-5 max-sm:h-5"
          />{" "}
          <p className="text-primary-green  max-sm:text-sm">Add New Business</p>
        </Link>
        <div className="flex gap-2">
          <button
            className="text-sm bg-primary-green text-white hover:bg-green-600 whitespace-nowrap transition-all duration-300 rounded-lg px-4 py-2 text-center mb-4"
            onClick={acceptJob}
          >
            Accept job
          </button>
          <button
            className="bg-red-500 text-white hover:bg-red-600 whitespace-nowrap transition-all duration-300 rounded-lg px-4 py-2 text-center mb-4 text-sm"
            onClick={() => AcceptDirectJob(applicationId, "rejected")}
          >
            Reject job
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default AcceptDirectJobModal;
