"use client";

import React, { useState, useEffect, useRef } from 'react';
import VoiceSearchButton from '../VoiceSearchButton/VoiceSearchButton';
import EmiCommandHandler from './EmiCommandHandler';
import JobAcceptance from './JobAcceptance';
import PaymentProcessor from './PaymentProcessor';
import ProjectTracking from './ProjectTracking';

interface EnhancedVoiceSearchProps {
  onResult: (query: string) => void;
  searchInputRef?: React.RefObject<HTMLInputElement>;
  serviceCategories?: string[];
}

const EnhancedVoiceSearch: React.FC<EnhancedVoiceSearchProps> = ({
  onResult,
  searchInputRef,
  serviceCategories = [
    "plumber", "electrician", "carpenter", "mechanic", "painter", "gardener", 
    "cleaner", "locksmith", "roofer", "hvac", "appliance repair"
  ],
}) => {
  const [showEmiHandler, setShowEmiHandler] = useState(false);
  const [serviceType, setServiceType] = useState("");
  const [showJobAcceptance, setShowJobAcceptance] = useState(false);
  const [selectedExpertId, setSelectedExpertId] = useState("");
  const [showPayment, setShowPayment] = useState(false);
  const [currentJobId, setCurrentJobId] = useState("");
  const [showTracking, setShowTracking] = useState(false);
  const [trackingInfo, setTrackingInfo] = useState<any>(null);

  const handleTranscriptChange = (transcript: string) => {
    if (searchInputRef && searchInputRef.current) {
      searchInputRef.current.value = transcript;
      
      const inputEvent = new Event('input', { bubbles: true });
      searchInputRef.current.dispatchEvent(inputEvent);
    }
  };

  const handleTranscriptComplete = async () => {
    if (searchInputRef && searchInputRef.current) {
      const text = searchInputRef.current.value;
      
      if (!text.trim()) return;
      
      const emiCommandRegex = /(?:emi|emmy|emmi)(?:,)?\s+(?:look|search|find|get)\s+(?:for|me)?\s+(?:a|an)?\s+(.+)/i;
      const matches = text.match(emiCommandRegex);
      
      if (matches) {
        const serviceTypeText = matches[1].trim();
        
        try {
          const response = await fetch("/api/enhance-search", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              query: serviceTypeText,
              categories: serviceCategories,
              isEmiCommand: true
            }),
          });
          
          if (response.ok) {
            const data = await response.json();
            if (data.isEmiCommand && data.detectedCategory) {
              handleEmiCommand(text, data.detectedCategory);
              return;
            }
          }
        } catch (error) {
          console.error("Error processing Emi command:", error);
        }
        
        return;
      }
      
      onResult(text);
    }
  };

  const handleEmiCommand = (command: string, detectedServiceType: string) => {
    setServiceType(detectedServiceType);
    setShowEmiHandler(true);
    return true;
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

  return (
    <>
      <VoiceSearchButton
        onTranscriptChange={handleTranscriptChange}
        onTranscriptComplete={handleTranscriptComplete}
      />
      
      {showEmiHandler && (
        <EmiCommandHandler
          serviceType={serviceType}
          onJobAccepted={handleJobAccepted}
          onClose={() => setShowEmiHandler(false)}
        />
      )}
      
      {showJobAcceptance && (
        <JobAcceptance
          expertId={selectedExpertId}
          onPaymentInitiated={handlePaymentInitiated}
          onClose={() => setShowJobAcceptance(false)}
        />
      )}
      
      {showPayment && (
        <PaymentProcessor
          jobId={currentJobId}
          onComplete={handlePaymentComplete}
          onClose={() => setShowPayment(false)}
        />
      )}
      
      {showTracking && trackingInfo && (
        <ProjectTracking
          trackingInfo={trackingInfo}
          onClose={() => setShowTracking(false)}
        />
      )}
    </>
  );
};

export default EnhancedVoiceSearch;
