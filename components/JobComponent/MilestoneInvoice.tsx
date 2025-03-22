import Image from "next/image";
import { useState } from "react";

import MilestoneInvoiceModal from "../modals/MilestoneInvoiceModal";

const MilestoneInvoice = ({ jobInfo, isJobOwner }: any) => {
  const [isOpenModal, setOpenModal] = useState(false);
  const [currentInvoiceDetails, setCurrentInvoiceDetails] = useState<any>({});

  const statusColors: Record<string, string> = {
    paid: "bg-[#054753]",
    unpaid: "bg-[#ff9933]",
    processing: isJobOwner ? "bg-[#054753]" : "bg-[#9ef769]",
  };

  const handleOpenInvoiceDetails = (invoiceDetails: any) => {
    setCurrentInvoiceDetails(invoiceDetails);
    setOpenModal(true);
  };

  return (
    <>
      <div className=" bg-white w-full rounded-lg py-10 px-5">
        <h5
          className="text-lg font-semibold max-sm:t
             mb-2"
        >
          Invoice
        </h5>
        <div className=" flex flex-col  gap-4 ">
          {jobInfo?.milestones?.map((milestone: any, index: number) => {
            const bgColor =
              statusColors[milestone?.paymentStatus] || "bg-[#ff9933]";
            return (
              <div key={index}>
                {milestone?.invoice?.invoiceRaised && (
                  <button
                    className={`w-full flex-c-b rounded-lg h-[48px] px-4 text-[#FCFEFD] text-sm font-medium ${bgColor}`}
                    onClick={() => handleOpenInvoiceDetails(milestone)}
                  >
                    Milestone {index + 1} invoice
                    <Image
                      src="/assets/icons/arrow-right-2.svg"
                      alt="menu"
                      width={20}
                      height={20}
                      className="object-contain w-6 h-6 max-sm:w-5 max-sm:h-5 "
                    />
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <MilestoneInvoiceModal
        isOpen={isOpenModal}
        onCancel={() => setOpenModal(false)}
        invoiceDetails={currentInvoiceDetails}
        currency={jobInfo?.currency}
      />
    </>
  );
};

export default MilestoneInvoice;
