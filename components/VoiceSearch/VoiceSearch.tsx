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

  const [testMode, setTestMode] = useState(false);
  const [testInput, setTestInput] = useState("");
  
  useEffect(() => {
    const isPreviewEnvironment = 
      process.env.NEXT_PUBLIC_PREVIEW === 'true' || 
      (typeof window !== 'undefined' && 
        (window.location.hostname.includes('devinapps.com') || 
         window.location.hostname.includes('localhost')));
    
    if (!browserSupportsSpeechRecognition) {
      console.error("Browser doesn't support speech recognition");
      showStatus("Your browser doesn't support speech recognition", 0);
      setTestMode(isPreviewEnvironment);
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
        
        if (isPreviewEnvironment) {
          console.log("Enabling test mode for preview environment");
          setTestMode(true);
          showStatus("Test mode enabled. Use the test input below.", 0);
        } else {
          showStatus("Please allow microphone access for voice search", 0);
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
    
    try {
      const emiCommandRegex = /(?:emi|emmy|emmi)(?:,)?\s+(?:look|search|find|get)\s+(?:for|me)?\s+(?:a|an)?\s+(.+)/i;
      const matches = text.match(emiCommandRegex);
      
      const isEmiCommand = !!matches;
      const searchTerm = matches ? matches[1].trim() : text;
      
      if (isEmiCommand) {
        console.log("Emi command detected:", searchTerm);
        showStatus(`Looking for ${searchTerm}...`, 0);
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
        console.error(`API error: Server responded with status: ${response.status}`);
        throw new Error(`Server responded with status: ${response.status}`);
      }

      const data = await response.json();
      const enhancedQuery = data.enhancedQuery || searchTerm;
      
      if (isEmiCommand && data.isEmiCommand && data.detectedCategory && onEmiCommand) {
        console.log("Executing Emi command for category:", data.detectedCategory);
        onEmiCommand(enhancedQuery, data.detectedCategory);
        showStatus(`Processing command for ${data.detectedCategory}...`, 5000);
        
        setTimeout(() => {
          console.log("Restarting listening after Emi command execution");
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
        aria-label={isListening ? "Voice search is listening" : "Voice search is active"}
        title={isListening ? "Emi is listening. Say 'Emi, look for a mechanic'" : "Voice search is active"}
        style={{
          backgroundColor: isListening ? `rgba(${parseInt(activeColor.slice(1, 3), 16)}, ${parseInt(activeColor.slice(3, 5), 16)}, ${parseInt(activeColor.slice(5, 7), 16)}, 0.1)` : "#e8f5e9",
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
      
      {testMode && (
        <div className="test-mode-container">
          <div className="test-input-form">
            <input
              type="text"
              value={testInput}
              onChange={(e) => setTestInput(e.target.value)}
              placeholder="Try: Emi, look for a mechanic"
              className="test-input-field"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  if (testInput.trim()) {
                    console.log("Processing test input:", testInput);
                    processTranscript(testInput);
                    setTestInput("");
                  }
                }
              }}
            />
            <button 
              type="button" 
              className="test-submit-button"
              onClick={() => {
                if (testInput.trim()) {
                  console.log("Processing test input:", testInput);
                  processTranscript(testInput);
                  setTestInput("");
                }
              }}
            >
              Test Voice Command
            </button>
          </div>
          <div className="test-mode-instructions">
            <p>Test Mode: Enter voice commands like "Emi, look for a mechanic"</p>
            <p>This simulates the voice recognition for testing purposes.</p>
            
            <div className="example-commands">
              <button 
                type="button" 
                className="example-command"
                onClick={() => {
                  console.log("Example command: Emi, look for a mechanic");
                  processTranscript("Emi, look for a mechanic");
                }}
              >
                Emi, look for a mechanic
              </button>
              <button 
                type="button" 
                className="example-command"
                onClick={() => {
                  console.log("Example command: Emi, look for a plumber");
                  processTranscript("Emi, look for a plumber");
                }}
              >
                Emi, look for a plumber
              </button>
              <button 
                type="button" 
                className="example-command"
                onClick={() => {
                  console.log("Example command: Emi, find an electrician");
                  processTranscript("Emi, find an electrician");
                }}
              >
                Emi, find an electrician
              </button>
            </div>
          </div>
        </div>
      )}
      
      {hasPermission === false && !testMode && (
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
            Try Again
          </button>
        </div>
      )}
    </>
  );
};

export default VoiceSearch;
