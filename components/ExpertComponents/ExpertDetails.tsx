"use client";

import { useGetServiceInfo } from "@/hooks/useGetServiceInfo";
import { useContext, useEffect, useState } from "react";
import ReviewProfile from "./ReviewProfile";
import ExpertMainContent from "./ExpertMainContent";
import ReviewSlider from "../ReviewSlider/ReviewSlider";
import AboutBusinessOwner from "./AboutBusinessOwner";
import ContactModal from "../modals/ContactModal";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/utils/AuthState";
import Link from "next/link";

interface ExpertDetailsProps {
  businessId: string;
}

const ExpertDetails = ({ businessId }: ExpertDetailsProps) => {
  const { loading, getServiceInfo, serviceInfo } = useGetServiceInfo();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openShareModal, setOpenShareModal] = useState<boolean>(false);

  const router = useRouter();
  const { currentUser } = useContext(AuthContext);

  const handleOpenModal = () => {
    if (!currentUser) {
      router.push("/login");
      return;
    }
    setOpenModal(true);
  };

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
            handleOpenModal={handleOpenModal}
            serviceInfo={serviceInfo}
          />
          <div className=" max-w-[676px] w-full flex-c-b pb-6 flex-wrap gap-2">
            <h6 className="sm:text-2xl text-lg font-semibold whitespace-nowrap">
              What people loved about this seller
            </h6>
            <Link
              href="/expert/reviews"
              className="max-sm:text-sm text-primary-green whitespace-nowrap"
            >
              See all reviews
            </Link>
          </div>
          <ReviewSlider />
          <AboutBusinessOwner
            serviceInfo={serviceInfo}
            handleOpenModal={handleOpenModal}
            setIsOpen={setIsOpen}
          />
          {/* contact modal */}
          <ContactModal
            isOpen={openModal}
            onCancel={() => setOpenModal(false)}
            user={serviceInfo?.userId}
          />
        </div>
      )}
    </div>
  );
};

export default ExpertDetails;
