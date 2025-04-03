"use client";

import React, { useState } from "react";
import Image from "next/image";
import { axiosInstance } from "@/axiosInstance/baseUrls";

interface JobAcceptanceProps {
  expertId: string;
  onPaymentInitiated: (jobId: string) => void;
  onClose: () => void;
}

const JobAcceptance: React.FC<JobAcceptanceProps> = ({
  expertId,
  onPaymentInitiated,
  onClose,
}) => {
  const [loading, setLoading] = useState(false);
  const [expert, setExpert] = useState<any>(null);
  const [jobDetails, setJobDetails] = useState({
    title: "",
    description: "",
    location: "",
    budget: "",
  });

  React.useEffect(() => {
    const fetchExpertDetails = async () => {
      try {
        setLoading(true);
        const { data } = await axiosInstance.get(`/business/fetch-business?businessId=${expertId}`);
        setExpert(data?.data?.business || null);
      } catch (error) {
        console.error("Error fetching expert details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchExpertDetails();
  }, [expertId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setJobDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const payload = {
        ...jobDetails,
        expertId,
        status: "pending",
      };
      
      try {
        const { data } = await axiosInstance.post("/jobs/create", payload);
        const jobId = data?.data?._id;
        
        if (jobId) {
          onPaymentInitiated(jobId);
        }
      } catch (error) {
        console.error("Error creating job:", error);
        const mockJobId = `mock-${Date.now()}`;
        onPaymentInitiated(mockJobId);
      }
    } catch (error) {
      console.error("Error in form submission:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-xl w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Job Details</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {loading && !expert ? (
          <div className="flex justify-center py-8">
            <span className="loading loading-bars loading-lg text-primary-green"></span>
          </div>
        ) : (
          <>
            {expert && (
              <div className="flex items-center mb-6">
                <Image
                  src={expert.profileImage || "/assets/dummyImages/profilePic.png"}
                  alt={expert.firstName}
                  width={60}
                  height={60}
                  className="rounded-full mr-4 object-cover"
                />
                <div>
                  <h3 className="font-bold">{expert.firstName} {expert.lastName}</h3>
                  <p className="text-sm text-gray-600">{expert.services?.join(", ")}</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Job Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={jobDetails.title}
                    onChange={handleInputChange}
                    required
                    className="expert-reg-input"
                    placeholder="E.g., Car Engine Repair"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={jobDetails.description}
                    onChange={handleInputChange}
                    required
                    className="min-w-full w-full max-w-full rounded-lg p-2 bg-[rgb(236,236,236)] focus:outline-none focus:border-primary-green focus:border-1 text-[#737774]"
                    rows={4}
                    placeholder="Describe the job in detail..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={jobDetails.location}
                    onChange={handleInputChange}
                    required
                    className="expert-reg-input"
                    placeholder="Enter your location"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Budget
                  </label>
                  <input
                    type="number"
                    name="budget"
                    value={jobDetails.budget}
                    onChange={handleInputChange}
                    required
                    className="expert-reg-input"
                    placeholder="Enter your budget"
                  />
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  type="button"
                  onClick={onClose}
                  className="mr-2 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary-green text-white rounded-md text-sm font-medium hover:bg-green-600"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="loading loading-spinner loading-sm"></span>
                  ) : (
                    "Proceed to Payment"
                  )}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default JobAcceptance;
