"use client";

import Image from "next/image";

import { useHirePrivateExpert } from "@/hooks/useHirePrivateExpert";
import HireExpertModal from "../modals/HireExpertModal";

const ExpertOptions = () => {
  const {
    handleSubmit,
    handleFileChange,
    handleChnage,
    loading,
    hiringDetails,
    selectedImage,
    setIsOpen,
    isOpen,
    onCancel,
    handleDelete,
  } = useHirePrivateExpert();

  return (
    <section className="padding-x padding-y">
      {/* Modal for hiring expert */}
      <HireExpertModal
        handleSubmit={handleSubmit}
        handleFileChange={handleFileChange}
        handleChnage={handleChnage}
        loading={loading}
        hiringDetails={hiringDetails}
        selectedImage={selectedImage}
        isOpen={isOpen}
        onCancel={onCancel}
        handleDelete={handleDelete}
      />
      <div className="flex gap-6 pb-20 max-md:flex-col max-md:items-center">
        <h4 className="text-4xl font-bold  max-sm:text-xl md:hidden">
          Investigator
        </h4>
        <div className="flex-1">
          <Image
            src="/assets/images/privateExpertImg.png"
            alt="logo"
            width={610}
            height={340}
            className="object-cover w-[610px] h-[340px] rounded-xl max-sm:w-full max-sm:h-[220px]"
          />
        </div>
        <div className="flex-1 flex flex-col gap-5">
          <h4 className="text-4xl font-bold  max-sm:text-xl max-md:hidden">
            Investigator
          </h4>
          <p className="max-sm:text-sm  max-md:text-center">
            Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
            sint. Velit officia consequat duis enim velit mollit. Exercitation
            veniam consequat sunt nostrud amet.Amet minim mollit non deserunt
            ullamco est sit aliqua dolor do amet sint. Velit officia consequat
            duis enim velit mollit. Exercitation veniam consequat sunt nostrud
            amet.
          </p>
          <div className="w-full flex max-md:justify-center">
            <button className="custom-btn" onClick={() => setIsOpen(true)}>
              Register Now
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-row-reverse gap-6 pb-20 max-md:flex-col max-md:items-center">
        <h4 className="text-4xl font-bold  max-sm:text-xl md:hidden">
          Supervisor
        </h4>
        <div className="flex-1">
          <Image
            src="/assets/images/privateExpertImg1.png"
            alt="logo"
            width={610}
            height={340}
            className="object-cover w-[610px] h-[340px] rounded-xl max-sm:w-full max-sm:h-[220px] "
          />
        </div>
        <div className="flex-1 flex flex-col gap-5">
          <h4 className="text-4xl font-bold  max-sm:text-xl max-md:hidden">
            Supervisor
          </h4>
          <p className="max-sm:text-sm  max-md:text-center">
            Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
            sint. Velit officia consequat duis enim velit mollit. Exercitation
            veniam consequat sunt nostrud amet.Amet minim mollit non deserunt
            ullamco est sit aliqua dolor do amet sint. Velit officia consequat
            duis enim velit mollit. Exercitation veniam consequat sunt nostrud
            amet.
          </p>
          <div className="w-full flex max-md:justify-center">
            <button className="custom-btn" onClick={() => setIsOpen(true)}>
              {" "}
              Register Now
            </button>
          </div>
        </div>
      </div>
      <div className="flex  gap-6 pb-20 max-md:flex-col max-md:items-center">
        <h4 className="text-4xl font-bold  max-sm:text-xl md:hidden">
          Project Manager
        </h4>
        <div className="flex-1">
          <Image
            src="/assets/images/privateExpertImg2.png"
            alt="logo"
            width={610}
            height={340}
            className="object-cover w-[610px] h-[340px] rounded-xl max-sm:w-full max-sm:h-[220px]"
          />
        </div>
        <div className="flex-1 flex flex-col gap-5">
          <h4 className="text-4xl font-bold  max-sm:text-xl max-md:hidden">
            Project Manager
          </h4>
          <p className="max-sm:text-sm  max-md:text-center">
            Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
            sint. Velit officia consequat duis enim velit mollit. Exercitation
            veniam consequat sunt nostrud amet.Amet minim mollit non deserunt
            ullamco est sit aliqua dolor do amet sint. Velit officia consequat
            duis enim velit mollit. Exercitation veniam consequat sunt nostrud
            amet.
          </p>
          <div className="w-full flex max-md:justify-center">
            <button className="custom-btn" onClick={() => setIsOpen(true)}>
              {" "}
              Register Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExpertOptions;
