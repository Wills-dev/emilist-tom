"use client";

import React, { useEffect, useRef, useState } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import "./VoiceSearch.css";

interface VoiceSearchProps {
  onResult: (query: string) => void;
  searchInputRef?: React.RefObject<HTMLInputElement>;
  buttonColor?: string;
  activeColor?: string;
  serviceCategories?: string[];
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
}) => {
  const [isListening, setIsListening] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const statusRef = useRef<HTMLDivElement>(null);
  
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
    }
  }, [browserSupportsSpeechRecognition]);

  useEffect(() => {
    if (isListening !== listening) {
      setIsListening(listening);
    }
  }, [listening, isListening]);

  const startListening = async () => {
    if (!browserSupportsSpeechRecognition) {
      showStatus("Your browser doesn't support speech recognition", 3000);
      return;
    }

    if (!isMicrophoneAvailable) {
      showStatus("Microphone access is denied. Please enable it in your browser settings.", 3000);
      return;
    }

    resetTranscript();
    setIsListening(true);
    showStatus("Listening...");
    
    try {
      await SpeechRecognition.startListening({ continuous: false, language: "en-US" });
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
    if (!listening && transcript) {
      processTranscript(transcript);
    }
  }, [listening, transcript]);

  const processTranscript = async (text: string) => {
    if (!text.trim()) return;
    
    showStatus("Processing your search...");
    
    try {
      const response = await fetch("/api/enhance-search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: text,
          categories: serviceCategories
        }),
      });

      if (!response.ok) {
        throw new Error(`Server responded with status: ${response.status}`);
      }

      const data = await response.json();
      const enhancedQuery = data.enhancedQuery || text;
      
      if (searchInputRef && searchInputRef.current) {
        searchInputRef.current.value = enhancedQuery;
        
        const inputEvent = new Event("input", { bubbles: true });
        searchInputRef.current.dispatchEvent(inputEvent);
      }
      
      onResult(enhancedQuery);
      
      showStatus(`Searching for: ${enhancedQuery}`, 3000);
    } catch (error) {
      console.error("Error enhancing search query:", error);
      
      if (searchInputRef && searchInputRef.current) {
        searchInputRef.current.value = text;
        
        const inputEvent = new Event("input", { bubbles: true });
        searchInputRef.current.dispatchEvent(inputEvent);
      }
      
      onResult(text);
      
      showStatus(`Searching for: ${text}`, 3000);
    }
  };

  return (
    <>
      <button
        className={`voice-search-button ${isListening ? "listening" : ""}`}
        onClick={isListening ? stopListening : startListening}
        aria-label="Search by voice"
        title="Search by voice"
        style={{
          backgroundColor: isListening ? activeColor : buttonColor,
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="white">
          <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/>
          <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/>
        </svg>
      </button>
      
      {statusMessage && (
        <div 
          ref={statusRef}
          className="voice-search-status"
        >
          {statusMessage}
        </div>
      )}
    </>
  );
};

export default VoiceSearch;
