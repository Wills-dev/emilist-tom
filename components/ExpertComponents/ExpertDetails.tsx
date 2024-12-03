"use client";

import { useGetServiceInfo } from "@/hooks/useGetServiceInfo";
import { useEffect, useState } from "react";
import ReviewProfile from "./ReviewProfile";
import ExpertMainContent from "./ExpertMainContent";

interface ExpertDetailsProps {
  businessId: string;
}

const ExpertDetails = ({ businessId }: ExpertDetailsProps) => {
  const { loading, getServiceInfo, serviceInfo } = useGetServiceInfo();

  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openShareModal, setOpenShareModal] = useState<boolean>(false);

  useEffect(() => {
    getServiceInfo(businessId);
  }, [businessId]);

  return (
    <div className="py-8">
      <ReviewProfile profile={true} setOpenShareModal={setOpenShareModal} />
      <ExpertMainContent
        setOpenModal={setOpenModal}
        serviceInfo={serviceInfo}
      />
    </div>
  );
};

export default ExpertDetails;
