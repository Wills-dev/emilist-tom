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
    handleAddDate,
    handleRemoveDate,
    availability,
    handleInputChange,
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
        handleAddDate={handleAddDate}
        handleRemoveDate={handleRemoveDate}
        availability={availability}
        handleInputChange={handleInputChange}
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
            The success of your project starts with clarity and authentication
            of project elements. Click here to engage the services of EmiList
            investigators to help you navigate the authentication of your
            project resources like work status, land, documents, contracts,
            agreements, qualifications, and certifications
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
            For meticulous project oversight, click here to engage experienced
            project supervisors who will closely monitor the project process,
            manage the team, allocate resources, and ensure timely delivery.
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
            To get your project done on time and within budget, you can engage
            the services of seasoned project mangers to help align project
            resources with schedule without exceeding budget.
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
