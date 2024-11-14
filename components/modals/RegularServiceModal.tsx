import Image from "next/image";
import Link from "next/link";
import React, { useContext, useState } from "react";

import { Modal } from "antd";
import toast from "react-hot-toast";

import { toastOptions } from "@/helpers";
import { AuthContext } from "@/utils/AuthState";

interface RegularServiceModalProps {
  isOpen: boolean;
  onCancel: () => void;
  handleApplyFofJob: (jobId: string, businessId: string) => Promise<void>;
  jobId: string;
}

const RegularServiceModal = ({
  isOpen,
  onCancel,
  handleApplyFofJob,
  jobId,
}: RegularServiceModalProps) => {
  const { currentUser } = useContext(AuthContext);
  const [service, setService] = useState("");

  const applyJob = () => {
    if (currentUser?.businesses.length === 0) {
      toast.error("Please add a business to proceed", toastOptions);
      return;
    }
    if (!service) {
      toast.error("Please select a business", toastOptions);
      return;
    }
    handleApplyFofJob(jobId, service);
  };

  return (
    <Modal open={isOpen} onCancel={onCancel} centered width={400} footer={null}>
      <h5 className="font-semibold text-center sm:text-lg mt-2">
        Apply for job
      </h5>

      <div className="flex items-start flex-col gap-4 pt-6">
        <div className="w-full">
          <p className="text-[#5e625f] py-2  font-medium max-sm:text-sm">
            Select business you want to apply with
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
        <button className="custom-btn" onClick={applyJob}>
          Apply
        </button>
      </div>
    </Modal>
  );
};

export default RegularServiceModal;
