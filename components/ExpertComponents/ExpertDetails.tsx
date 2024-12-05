"use client";

import { useGetServiceInfo } from "@/hooks/useGetServiceInfo";
import { useEffect, useState } from "react";
import ReviewProfile from "./ReviewProfile";
import ExpertMainContent from "./ExpertMainContent";
import ReviewSlider from "../ReviewSlider/ReviewSlider";
import AboutBusinessOwner from "./AboutBusinessOwner";
import ContactModal from "../modals/ContactModal";

interface ExpertDetailsProps {
  businessId: string;
}

const ExpertDetails = ({ businessId }: ExpertDetailsProps) => {
  const { loading, getServiceInfo, serviceInfo } = useGetServiceInfo();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openShareModal, setOpenShareModal] = useState<boolean>(false);

  useEffect(() => {
    getServiceInfo(businessId);
  }, [businessId]);

  return (
    <div className="py-8">
      {loading ? (
        <div className="flex item-center justify-center text-green-500 mt-6 h-[70vh]">
          <span className="loading loading-bars loading-lg"></span>
        </div>
      ) : (
        <div className="padding-x py-28">
          <ReviewProfile
            serviceInfo={serviceInfo}
            setOpenShareModal={setOpenShareModal}
          />
          <ExpertMainContent
            setOpenModal={setOpenModal}
            serviceInfo={serviceInfo}
          />
          <ReviewSlider />
          <AboutBusinessOwner
            serviceInfo={serviceInfo}
            setOpenModal={setOpenModal}
            setIsOpen={setIsOpen}
          />

          {/* contact modal */}
          <ContactModal
            isOpen={openModal}
            onCancel={() => setOpenModal(false)}
          />
        </div>
      )}
    </div>
  );
};

export default ExpertDetails;
