"use client";

import React, { useState, useEffect, useRef } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { MdMic, MdMicOff } from 'react-icons/md';
import './VoiceSearchButton.css';

interface VoiceSearchButtonProps {
  onTranscriptChange: (transcript: string) => void;
  onTranscriptComplete: () => void;
}

const VoiceSearchButton: React.FC<VoiceSearchButtonProps> = ({ 
  onTranscriptChange, 
  onTranscriptComplete 
}) => {
  const [isListening, setIsListening] = useState(false);
  const [permissionError, setPermissionError] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  
  const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();
  
  useEffect(() => {
    if (transcript) {
      onTranscriptChange(transcript);
    }
  }, [transcript, onTranscriptChange]);
  
  useEffect(() => {
    setIsListening(listening);
  }, [listening]);
  
  const toggleListening = () => {
    if (!isListening) {
      resetTranscript();
      SpeechRecognition.startListening({
        continuous: true,
        language: 'en-US',
      }).catch(error => {
        console.error('Speech recognition error:', error);
        setPermissionError(true);
      });
      setIsListening(true);
    } else {
      SpeechRecognition.stopListening();
      setIsListening(false);
      onTranscriptComplete();
    }
  };
  
  const retryPermission = () => {
    setPermissionError(false);
    toggleListening();
  };
  
  if (!browserSupportsSpeechRecognition) {
    return null; // Don't render the button if speech recognition is not supported
  }
  
  return (
    <div className="voice-search-container">
      <button 
        ref={buttonRef}
        type="button"
        onClick={toggleListening}
        className={`voice-search-button text-xl p-2 rounded-full transition-all duration-300 ${isListening ? 'listening' : ''}`}
        aria-label={isListening ? "Stop voice search" : "Start voice search"}
        style={{
          backgroundColor: isListening ? '#ea4335' : '#4caf50',
          border: 'none',
          width: '40px',
          height: '40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '50%',
          margin: '0 8px',
          cursor: 'pointer',
          boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
          zIndex: 20
        }}
      >
        <MdMic style={{ color: 'white', fontSize: '24px' }} />
      </button>
      
      {isListening && (
        <div className="voice-search-status" style={{
          position: 'absolute',
          top: '100%',
          right: '0',
          marginTop: '8px',
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          color: 'white',
          padding: '6px 12px',
          borderRadius: '4px',
          fontSize: '12px',
          zIndex: 10,
          whiteSpace: 'nowrap'
        }}>
          Listening...
        </div>
      )}
      
      {permissionError && (
        <div className="permission-prompt" style={{
          position: 'absolute',
          top: '100%',
          right: '0',
          marginTop: '8px',
          backgroundColor: '#f8d7da',
          color: '#721c24',
          padding: '10px',
          borderRadius: '4px',
          fontSize: '12px',
          zIndex: 10,
          width: '220px',
          boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)'
        }}>
          <p>Microphone access is required for voice search.</p>
          <button 
            className="retry-permission-button" 
            onClick={retryPermission}
            style={{
              backgroundColor: '#721c24',
              color: 'white',
              border: 'none',
              padding: '5px 10px',
              borderRadius: '4px',
              marginTop: '5px',
              cursor: 'pointer',
              fontSize: '12px'
            }}
          >
            Allow Microphone
          </button>
        </div>
      )}
    </div>
  );
};

export default VoiceSearchButton;
