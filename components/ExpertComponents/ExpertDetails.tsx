"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

import ReviewProfile from "./ReviewProfile";
import ContactModal from "../modals/ContactModal";
import ExpertMainContent from "./ExpertMainContent";
import ReviewSlider from "../ReviewSlider/ReviewSlider";
import AboutBusinessOwner from "./AboutBusinessOwner";

import { AuthContext } from "@/utils/AuthState";
import { useGetServiceInfo } from "@/hooks/useGetServiceInfo";
import ShareLink from "../modals/ShareLink";
import { useLikeBusiness } from "@/hooks/useLikeBusiness";
import { useUnlikeBusiness } from "@/hooks/useUnlikeBusiness";
import { useCompare } from "@/hooks/useCompare";
import { useGetBusinessReviews } from "@/hooks/useGetBusinessReviews";
import ReviewSliderLoader from "../ReviewSlider/ReviewSliderLoader";
import { CompareContext } from "@/utils/CompareState";
import CompareSearch from "../Compare/CompareSearch";

interface ExpertDetailsProps {
  businessId: string;
}

const ExpertDetails = ({ businessId }: ExpertDetailsProps) => {
  const router = useRouter();

  const { currentUser } = useContext(AuthContext);
  const { compareServices, rrerender } = useContext(CompareContext);
  const { loading, getServiceInfo, serviceInfo } = useGetServiceInfo();

  const { compare } = useCompare();
  const { handleLikeBusiness, rerender } = useLikeBusiness();
  const { data, isLoading, getReviews } = useGetBusinessReviews();
  const { handleUnlikeBusiness, unsaveRerenderr } = useUnlikeBusiness();

  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openShareModal, setOpenShareModal] = useState<boolean>(false);

  const handleOpenModal = () => {
    if (!currentUser) {
      router.push("/login");
      return;
    }
    setOpenModal(true);
  };

  const handleOpen = () => {
    setOpenShareModal(true);
  };

  useEffect(() => {
    getServiceInfo(businessId);
  }, [businessId, rerender, unsaveRerenderr, rrerender]);

  useEffect(() => {
    getReviews(businessId, "mostRecent");
  }, []);

  return (
    <div className="py-8">
      {loading ? (
        <div className="flex item-center justify-center text-green-500 mt-6 h-[80vh]">
          <span className="loading loading-bars loading-lg"></span>
        </div>
      ) : (
        <div className="padding-ctn py-28">
          {compareServices.length > 0 && (
            <CompareSearch title="businesses" link="/compare" />
          )}
          <ReviewProfile
            serviceInfo={serviceInfo}
            handleOpen={handleOpen}
            handleLikeBusiness={handleLikeBusiness}
            handleUnlikeBusiness={handleUnlikeBusiness}
            compare={compare}
          />
          <ExpertMainContent
            handleOpenModal={handleOpenModal}
            serviceInfo={serviceInfo?.business}
          />
          <div className=" max-w-[676px] w-full flex-c-b pb-6 flex-wrap gap-2">
            <h6 className="sm:text-2xl text-lg font-semibold whitespace-nowrap">
              What people loved about this seller
            </h6>
            {data?.length > 0 && (
              <Link
                href={`/expert/reviews/${businessId}`}
                className="max-sm:text-sm text-primary-green whitespace-nowrap"
              >
                See all reviews
              </Link>
            )}
          </div>
          {isLoading ? (
            <ReviewSliderLoader />
          ) : (
            <>
              {data?.length > 0 ? (
                <ReviewSlider reviews={data} />
              ) : (
                <p>No review for this business</p>
              )}
            </>
          )}
          <AboutBusinessOwner
            serviceInfo={serviceInfo?.business}
            handleOpenModal={handleOpenModal}
          />
          {/* contact modal */}
          <ContactModal
            isOpen={openModal}
            onCancel={() => setOpenModal(false)}
            user={serviceInfo?.business?.userId}
          />
          {/* Share modal */}
          <ShareLink
            handleCancel={() => setOpenShareModal(false)}
            isModalOpen={openShareModal}
            link={`https://emilist.com/expert/info/${businessId}`}
            title="Share business"
            textToCopy="Check out this business on Emilist"
            id={businessId}
          />
        </div>
      )}
    </div>
  );
};

export default ExpertDetails;
