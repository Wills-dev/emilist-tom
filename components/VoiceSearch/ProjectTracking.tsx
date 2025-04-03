"use client";

import React from "react";
import { useRouter } from "next/navigation";

interface TrackingInfo {
  jobId: string;
  status: string;
  paymentMethod: string;
  startDate: string;
  estimatedCompletionDate: string;
}

interface ProjectTrackingProps {
  trackingInfo: TrackingInfo;
  onClose: () => void;
}

const ProjectTracking: React.FC<ProjectTrackingProps> = ({ trackingInfo, onClose }) => {
  const router = useRouter();
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  const viewJobDetails = () => {
    router.push(`/dashboard/job/active?id=${trackingInfo.jobId}`);
    onClose();
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Project Tracking</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="space-y-6">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center mb-2">
              <svg className="w-6 h-6 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              <span className="font-medium">Payment Successful!</span>
            </div>
            <p className="text-sm text-gray-600">Your job request has been submitted and payment processed.</p>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Status:</span>
              <span className="font-medium text-green-600">{trackingInfo.status}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Payment Method:</span>
              <span className="font-medium">{trackingInfo.paymentMethod}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Start Date:</span>
              <span className="font-medium">{formatDate(trackingInfo.startDate)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Estimated Completion:</span>
              <span className="font-medium">{formatDate(trackingInfo.estimatedCompletionDate)}</span>
            </div>
          </div>
          
          <div className="border-t pt-4 mt-4">
            <p className="text-sm text-gray-600 mb-4">
              You can track the progress of your job in your dashboard. The service provider will update the status as they work on your request.
            </p>
            <button
              onClick={viewJobDetails}
              className="w-full bg-primary-green text-white py-2 rounded-md hover:bg-green-600 transition-colors"
            >
              View Job Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectTracking;
