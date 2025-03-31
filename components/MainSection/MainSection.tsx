"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

import ImageOne from "../../public/assets/images/Vector 262.png";
import ImageTwo from "../../public/assets/images/Vector 262 (1).png";
import ImageThree from "../../public/assets/images/Vector 263.png";
import ImageFour from "../../public/assets/images/Vector 263 (1).png";
import ImageFive from "../../public/assets/images/Vector 264.png";
import ImageSix from "../../public/assets/images/Vector 264 (1).png";
import VoiceSearch from "../VoiceSearch/VoiceSearch";
import EmiCommandHandler from "../VoiceSearch/EmiCommandHandler";
import JobAcceptance from "../VoiceSearch/JobAcceptance";
import PaymentProcessor from "../VoiceSearch/PaymentProcessor";
import ProjectTracking from "../VoiceSearch/ProjectTracking";

const MainSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showEmiHandler, setShowEmiHandler] = useState(false);
  const [serviceType, setServiceType] = useState("");
  const [showJobAcceptance, setShowJobAcceptance] = useState(false);
  const [selectedExpertId, setSelectedExpertId] = useState("");
  const [showPayment, setShowPayment] = useState(false);
  const [currentJobId, setCurrentJobId] = useState("");
  const [showTracking, setShowTracking] = useState(false);
  const [trackingInfo, setTrackingInfo] = useState<any>(null);
  
  const searchInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted with:", searchQuery);
    
    if (!searchQuery.trim()) return;
    
    const emiCommandRegex = /(?:emi|emmy|emmi)(?:,)?\s+(?:look|search|find|get)\s+(?:for|me)?\s+(?:a|an)?\s+(.+)/i;
    const matches = searchQuery.match(emiCommandRegex);
    console.log("Emi command regex matches:", matches);
    
    if (matches) {
      const serviceTypeText = matches[1].trim();
      console.log("Service type extracted:", serviceTypeText);
      try {
        console.log("Sending to enhance-search API");
        const response = await fetch("/api/enhance-search", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: serviceTypeText,
            isEmiCommand: true
          }),
        });
        
        if (response.ok) {
          const data = await response.json();
          console.log("API response:", data);
          if (data.isEmiCommand && data.detectedCategory) {
            console.log("Handling Emi command for category:", data.detectedCategory);
            handleEmiCommand(serviceTypeText, data.detectedCategory);
            return;
          }
        } else {
          console.error("API response not OK:", response.status);
        }
      } catch (error) {
        console.error("Error processing Emi command:", error);
      }
    }
    
    console.log("Proceeding with regular search");
    router.push(`/catalog/services?q=${encodeURIComponent(searchQuery.trim())}`);
  };
  
  const handleVoiceSearchResult = async (result: string) => {
    console.log("Voice search result:", result);
    setSearchQuery(result);
    if (!result.trim()) return;
    
    const emiCommandRegex = /(?:emi|emmy|emmi)(?:,)?\s+(?:look|search|find|get)\s+(?:for|me)?\s+(?:a|an)?\s+(.+)/i;
    const matches = result.match(emiCommandRegex);
    console.log("Emi command regex matches:", matches);
    
    if (matches) {
      const serviceTypeText = matches[1].trim();
      console.log("Service type extracted:", serviceTypeText);
      try {
        console.log("Sending to enhance-search API");
        const response = await fetch("/api/enhance-search", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: serviceTypeText,
            isEmiCommand: true
          }),
        });
        
        if (response.ok) {
          const data = await response.json();
          console.log("API response:", data);
          if (data.isEmiCommand && data.detectedCategory) {
            console.log("Handling Emi command for category:", data.detectedCategory);
            handleEmiCommand(serviceTypeText, data.detectedCategory);
            return;
          }
        } else {
          console.error("API response not OK:", response.status);
        }
      } catch (error) {
        console.error("Error processing Emi command:", error);
      }
    }
    
    console.log("Proceeding with regular search");
    router.push(`/catalog/services?q=${encodeURIComponent(result.trim())}`);
  };
  
  const handleEmiCommand = (command: string, detectedServiceType: string) => {
    setServiceType(detectedServiceType);
    setShowEmiHandler(true);
  };
  
  const handleJobAccepted = (expertId: string) => {
    setSelectedExpertId(expertId);
    setShowEmiHandler(false);
    setShowJobAcceptance(true);
  };
  
  const handlePaymentInitiated = (jobId: string) => {
    setCurrentJobId(jobId);
    setShowJobAcceptance(false);
    setShowPayment(true);
  };
  
  const handlePaymentComplete = (trackingData: any) => {
    setTrackingInfo(trackingData);
    setShowPayment(false);
    setShowTracking(true);
  };
  
  const handleCloseEmiHandler = () => {
    setShowEmiHandler(false);
  };
  
  const handleCloseJobAcceptance = () => {
    setShowJobAcceptance(false);
  };
  
  const handleClosePayment = () => {
    setShowPayment(false);
  };
  
  const handleCloseTracking = () => {
    setShowTracking(false);
  };
  return (
    <>
      <section className="pt-28 relative w-full">
        <div className="w-full padding-ctn">
          <div className="flex justify-between max-lg:flex-col md:gap-10 gap-6 md:border-1 md:p-6 border-gray-300 rounded-2xl">
            <div className="flex lg:flex-col max-lg:justify-between max-lg:gap-2">
              <div className="">
                <Image
                  src={ImageOne}
                  placeholder="blur"
                  alt="hero images"
                  className=""
                />
              </div>
              <div className="">
                <Image
                  src={ImageThree}
                  placeholder="blur"
                  alt="hero images"
                  className=""
                />
              </div>
              <div className="">
                <Image
                  src={ImageFive}
                  placeholder="blur"
                  alt="hero images"
                  className=""
                />
              </div>
            </div>
            <div className="flex-1 w-full flex justify-center">
              <div className="max-w-lg space-y-7 flex flex-col  justify-center">
                <h1 className="md:text-5xl text-3xl font-bold text-center leading-normal">
                  Discover Your Project Dream Team Here.
                </h1>
                <p className="text-center">
                  This platform connects homeowners, contractors, businesses, and
                  customers with skilled artisans, handymen, and project experts
                  for renovations, custom-builds, and repairs.
                </p>
                <div className="w-full flex justify-center pt-5">
                  <form
                    onSubmit={handleSearch}
                    className="max-w-96 w-full flex px-3 h-12 border-1 border-gray-400 rounded-lg focus-within:border-primary-green relative"
                  >
                    <input
                      ref={searchInputRef}
                      type="search"
                      name="search"
                      id="search"
                      placeholder="Ask AI anything"
                      className="flex-1 bg-inherit outline-none"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <VoiceSearch 
                      onResult={handleVoiceSearchResult}
                      searchInputRef={searchInputRef}
                      buttonColor="#4caf50"
                      activeColor="#ea4335"
                      onEmiCommand={handleEmiCommand}
                    />
                    <button type="submit">
                      <Image
                        src="/assets/icons/Group 26929.svg"
                        width={20}
                        height={20}
                        alt="submit icon"
                        className="object-contain w-8 h-8"
                      />
                    </button>
                  </form>
                </div>
              </div>
            </div>
            <div className="flex lg:flex-col max-lg:justify-between max-lg:gap-2">
              <div className="">
                <Image
                  src={ImageTwo}
                  placeholder="blur"
                  alt="hero images"
                  className=""
                />
              </div>
              <div className="">
                <Image
                  src={ImageFour}
                  placeholder="blur"
                  alt="hero images"
                  className=""
                />
              </div>
              <div className="">
                <Image
                  src={ImageSix}
                  placeholder="blur"
                  alt="hero images"
                  className=""
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {showEmiHandler && (
        <EmiCommandHandler
          serviceType={serviceType}
          onJobAccepted={handleJobAccepted}
          onClose={handleCloseEmiHandler}
        />
      )}
      
      {showJobAcceptance && (
        <JobAcceptance
          expertId={selectedExpertId}
          onPaymentInitiated={handlePaymentInitiated}
          onClose={handleCloseJobAcceptance}
        />
      )}
      
      {showPayment && (
        <PaymentProcessor
          jobId={currentJobId}
          onComplete={handlePaymentComplete}
          onClose={handleClosePayment}
        />
      )}
      
      {showTracking && trackingInfo && (
        <ProjectTracking
          trackingInfo={trackingInfo}
          onClose={handleCloseTracking}
        />
      )}
    </>
  );
};

export default MainSection;
