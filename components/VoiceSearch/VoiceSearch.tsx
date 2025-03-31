"use client";

import React, { useEffect, useRef, useState } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import "./VoiceSearch.css";
import Image from "next/image";

interface VoiceSearchProps {
  onResult: (query: string) => void;
  searchInputRef?: React.RefObject<HTMLInputElement>;
  buttonColor?: string;
  activeColor?: string;
  serviceCategories?: string[];
  onEmiCommand?: (command: string, serviceType: string) => void;
}

const VoiceSearch: React.FC<VoiceSearchProps> = ({
  onResult,
  searchInputRef,
  buttonColor = "#4caf50",
  activeColor = "#ea4335",
  serviceCategories = [
    "plumber", "electrician", "carpenter", "mechanic", "painter", "gardener", 
    "cleaner", "locksmith", "roofer", "hvac", "appliance repair"
  ],
  onEmiCommand,
}) => {
  const [isListening, setIsListening] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const processingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const silenceTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastTranscriptRef = useRef<string>("");
  
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
    isMicrophoneAvailable
  } = useSpeechRecognition();

  useEffect(() => {
    if (!browserSupportsSpeechRecognition) {
      console.error("Browser doesn't support speech recognition");
      showStatus("Your browser doesn't support speech recognition", 3000);
      return;
    }

    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(() => {
        setHasPermission(true);
        startContinuousListening();
      })
      .catch((error) => {
        console.error("Microphone permission error:", error);
        setHasPermission(false);
        showStatus("Please allow microphone access for voice search", 5000);
      });

    return () => {
      if (processingTimeoutRef.current) {
        clearTimeout(processingTimeoutRef.current);
      }
      if (silenceTimeoutRef.current) {
        clearTimeout(silenceTimeoutRef.current);
      }
      SpeechRecognition.stopListening();
    };
  }, [browserSupportsSpeechRecognition]);

  useEffect(() => {
    if (isListening !== listening) {
      setIsListening(listening);
    }
  }, [listening, isListening]);

  const startContinuousListening = async () => {
    if (!browserSupportsSpeechRecognition || !hasPermission) {
      return;
    }

    resetTranscript();
    setIsListening(true);
    showStatus("Listening...");
    
    try {
      await SpeechRecognition.startListening({ 
        continuous: true, 
        language: "en-US" 
      });
      console.log("Started continuous listening");
    } catch (error) {
      console.error("Error starting voice recognition:", error);
      showStatus("Error starting voice recognition", 3000);
      setIsListening(false);
    }
  };

  const stopListening = () => {
    SpeechRecognition.stopListening();
    setIsListening(false);
  };

  const showStatus = (message: string, duration = 0) => {
    setStatusMessage(message);
    
    if (duration > 0) {
      setTimeout(() => {
        setStatusMessage("");
      }, duration);
    }
  };
  
  useEffect(() => {
    if (transcript && transcript !== lastTranscriptRef.current) {
      lastTranscriptRef.current = transcript;
      
      if (silenceTimeoutRef.current) {
        clearTimeout(silenceTimeoutRef.current);
      }
      
      silenceTimeoutRef.current = setTimeout(() => {
        processTranscript(transcript);
      }, 1500); // 1.5 second silence threshold
    }
  }, [transcript]);

  const processTranscript = async (text: string) => {
    if (!text.trim()) return;
    
    resetTranscript();
    lastTranscriptRef.current = "";
    
    showStatus("Processing your search...");
    
    try {
      const emiCommandRegex = /(?:emi|emmy|emmi)(?:,)?\s+(?:look|search|find|get)\s+(?:for|me)?\s+(?:a|an)?\s+(.+)/i;
      const matches = text.match(emiCommandRegex);
      
      const isEmiCommand = !!matches;
      const searchTerm = matches ? matches[1].trim() : text;
      
      if (isEmiCommand) {
        showStatus(`Looking for ${searchTerm}...`);
      }
      
      const response = await fetch("/api/enhance-search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: searchTerm,
          categories: serviceCategories,
          isEmiCommand
        }),
      });

      if (!response.ok) {
        throw new Error(`Server responded with status: ${response.status}`);
      }

      const data = await response.json();
      const enhancedQuery = data.enhancedQuery || searchTerm;
      
      if (isEmiCommand && data.isEmiCommand && data.detectedCategory && onEmiCommand) {
        onEmiCommand(enhancedQuery, data.detectedCategory);
        showStatus(`Processing command for ${data.detectedCategory}...`, 3000);
        
        setTimeout(() => {
          startContinuousListening();
        }, 5000);
        return;
      }
      
      if (searchInputRef && searchInputRef.current) {
        searchInputRef.current.value = enhancedQuery;
        
        const inputEvent = new Event("input", { bubbles: true });
        searchInputRef.current.dispatchEvent(inputEvent);
      }
      
      onResult(enhancedQuery);
      
      showStatus(`Searching for: ${enhancedQuery}`, 3000);
      
      setTimeout(() => {
        startContinuousListening();
      }, 5000);
    } catch (error) {
      console.error("Error enhancing search query:", error);
      
      if (searchInputRef && searchInputRef.current) {
        searchInputRef.current.value = text;
        
        const inputEvent = new Event("input", { bubbles: true });
        searchInputRef.current.dispatchEvent(inputEvent);
      }
      
      onResult(text);
      
      showStatus(`Searching for: ${text}`, 3000);
      
      setTimeout(() => {
        startContinuousListening();
      }, 5000);
    }
  };

  return (
    <>
      <div
        className={`voice-search-indicator ${isListening ? "listening" : ""}`}
        aria-label="Voice search is active"
        title="Voice search is active"
        style={{
          backgroundColor: isListening ? activeColor : "transparent",
        }}
      >
        <Image
          src="/assets/icons/Group 26929.svg"
          width={32}
          height={32}
          alt="AI assistant"
          className="bot-icon"
        />
      </div>
      
      {statusMessage && (
        <div 
          ref={statusRef}
          className="voice-search-status"
        >
          {statusMessage}
        </div>
      )}
      
      {hasPermission === false && (
        <div className="permission-prompt">
          Allow microphone access for voice search
        </div>
      )}
    </>
  );
};

export default VoiceSearch;
