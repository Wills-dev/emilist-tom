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
    const isPreviewEnvironment = 
      process.env.NEXT_PUBLIC_PREVIEW === 'true' || 
      (typeof window !== 'undefined' && 
        (window.location.hostname.includes('devinapps.com') || 
         window.location.hostname.includes('netlify.app') ||
         window.location.hostname.includes('localhost')));
    
    if (!browserSupportsSpeechRecognition) {
      console.error("Browser doesn't support speech recognition");
      showStatus("Your browser doesn't support speech recognition", 0);
      return;
    }

    console.log("Requesting microphone permission for voice search");
    showStatus("Initializing voice search...");
    
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(() => {
        console.log("Microphone permission granted, starting continuous listening");
        setHasPermission(true);
        startContinuousListening();
      })
      .catch((error) => {
        console.error("Microphone permission error:", error);
        setHasPermission(false);
        showStatus("Please allow microphone access for voice search", 0);
        
        if (isPreviewEnvironment) {
          console.log("Preview environment detected, simulating voice commands");
          
          setTimeout(() => {
            if (onEmiCommand) {
              console.log("Simulating Emi command for mechanic");
              onEmiCommand("Emi, look for a mechanic", "mechanic");
            }
          }, 5000);
        }
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
  
  useEffect(() => {
    if (hasPermission === true && !isListening) {
      console.log("Auto-starting continuous listening");
      startContinuousListening();
    }
  }, [hasPermission, isListening]);

  const startContinuousListening = async () => {
    if (!browserSupportsSpeechRecognition || !hasPermission) {
      console.warn("Cannot start listening: browser support or permission missing");
      return;
    }

    resetTranscript();
    setIsListening(true);
    showStatus("Listening...", 0); // Keep status visible while listening
    console.log("Starting continuous listening mode");
    
    try {
      await SpeechRecognition.startListening({ 
        continuous: true, 
        language: "en-US" 
      });
      console.log("Started continuous listening successfully");
    } catch (error) {
      console.error("Error starting voice recognition:", error);
      showStatus("Error starting voice recognition. Please refresh the page.", 0);
      setIsListening(false);
      
      setTimeout(() => {
        console.log("Attempting to restart voice recognition after error");
        startContinuousListening();
      }, 5000);
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
      console.log("Transcript received:", transcript);
      lastTranscriptRef.current = transcript;
      
      if (silenceTimeoutRef.current) {
        clearTimeout(silenceTimeoutRef.current);
      }
      
      if (transcript.length > 5) {
        showStatus(`Heard: "${transcript}"`, 0);
      }
      
      silenceTimeoutRef.current = setTimeout(() => {
        console.log("Silence detected, processing transcript:", transcript);
        processTranscript(transcript);
      }, 1500); // 1.5 second silence threshold
    }
  }, [transcript]);

  const processTranscript = async (text: string) => {
    if (!text.trim()) {
      console.log("Empty transcript, ignoring");
      return;
    }
    
    resetTranscript();
    lastTranscriptRef.current = "";
    
    showStatus("Processing your search...", 0);
    console.log("Processing transcript:", text);
    
    let enhancedQuery = text;
    
    try {
      const emiCommandRegex = /(?:emi|emmy|emmi)(?:,)?\s+(?:look|search|find|get)\s+(?:for|me)?\s+(?:a|an)?\s+(.+)/i;
      const matches = text.match(emiCommandRegex);
      
      const isEmiCommand = !!matches;
      const searchTerm = matches ? matches[1].trim() : text;
      
      if (isEmiCommand) {
        console.log("Emi command detected:", searchTerm);
        showStatus(`Looking for ${searchTerm}...`, 0);
      }
      
      console.log("Making API call to enhance-search with:", {
        query: searchTerm,
        categories: serviceCategories,
        isEmiCommand
      });
      
      try {
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

        console.log("API response status:", response.status);
        
        if (!response.ok) {
          console.error(`API error: Server responded with status: ${response.status}`);
          throw new Error(`Server responded with status: ${response.status}`);
        }

        const data = await response.json();
        console.log("API response data:", data);
        
        enhancedQuery = data.enhancedQuery || searchTerm;
        
        if (isEmiCommand && data.isEmiCommand && data.detectedCategory && onEmiCommand) {
          console.log("Executing Emi command for category:", data.detectedCategory);
          console.log("Calling onEmiCommand with:", enhancedQuery, data.detectedCategory);
          
          const emiEvent = new CustomEvent('emiCommand', {
            detail: {
              command: enhancedQuery,
              serviceType: data.detectedCategory
            },
            bubbles: true
          });
          
          console.log("Dispatching emiCommand event for", data.detectedCategory);
          document.dispatchEvent(emiEvent);
          
          if (onEmiCommand) {
            onEmiCommand(enhancedQuery, data.detectedCategory);
          }
          
          console.log("Emi command processed, preventing default search");
          showStatus(`Processing command for ${data.detectedCategory}...`, 5000);
          
          setTimeout(() => {
            console.log("Restarting listening after Emi command execution");
            startContinuousListening();
          }, 5000);
          return;
        }
        
        console.log("Not executing Emi command, conditions not met:", {
          isEmiCommand,
          dataIsEmiCommand: data.isEmiCommand,
          detectedCategory: data.detectedCategory,
          hasOnEmiCommand: !!onEmiCommand
        });
      } catch (error) {
        console.error("Error in API call:", error);
        console.log("Continuing with original text due to API error");
      }
      
      if (!isEmiCommand) {
        if (searchInputRef && searchInputRef.current) {
          searchInputRef.current.value = enhancedQuery;
          
          const inputEvent = new Event("input", { bubbles: true });
          searchInputRef.current.dispatchEvent(inputEvent);
        }
        
        onResult(enhancedQuery);
        
        showStatus(`Searching for: ${enhancedQuery}`, 3000);
      } else {
        console.log("Emi command detected but not processed, preventing default search");
        return;
      }
      
      setTimeout(() => {
        startContinuousListening();
      }, 5000);
    } catch (error) {
      console.error("Error enhancing search query:", error);
      
      const emiCommandRegex = /(?:emi|emmy|emmi)(?:,)?\s+(?:look|search|find|get)\s+(?:for|me)?\s+(?:a|an)?\s+(.+)/i;
      if (!emiCommandRegex.test(text)) {
        if (searchInputRef && searchInputRef.current) {
          searchInputRef.current.value = text;
          
          const inputEvent = new Event("input", { bubbles: true });
          searchInputRef.current.dispatchEvent(inputEvent);
        }
        
        onResult(text);
        
        showStatus(`Searching for: ${text}`, 3000);
      } else {
        console.log("Emi command detected but error occurred, preventing default search");
        return;
      }
      
      setTimeout(() => {
        startContinuousListening();
      }, 5000);
    }
  };


  return (
    <>
      <div
        className={`voice-search-indicator ${isListening ? "listening" : ""}`}
        aria-label={isListening ? "Emi is listening" : "Emi is active"}
        title={isListening ? "Emi is listening. Say 'Emi, look for a mechanic'" : "Emi is active"}
        style={{
          backgroundColor: isListening ? `rgba(${parseInt(activeColor.slice(1, 3), 16)}, ${parseInt(activeColor.slice(3, 5), 16)}, ${parseInt(activeColor.slice(5, 7), 16)}, 0.1)` : "#e8f5e9",
          boxShadow: isListening ? "0 0 10px rgba(76, 175, 80, 0.5)" : "none",
          cursor: "default"
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
          <strong>Microphone access required</strong>
          <p>Please allow microphone access in your browser to use voice search</p>
          <button 
            onClick={() => {
              console.log("Requesting microphone permission again");
              navigator.mediaDevices.getUserMedia({ audio: true })
                .then(() => {
                  console.log("Microphone permission granted on retry");
                  setHasPermission(true);
                  startContinuousListening();
                })
                .catch(error => {
                  console.error("Microphone permission denied again:", error);
                });
            }}
            className="retry-permission-button"
          >
            Allow Microphone
          </button>
        </div>
      )}
    </>
  );
};

export default VoiceSearch;
