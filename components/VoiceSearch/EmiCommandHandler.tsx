"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface EmiCommandHandlerProps {
  serviceType: string;
  onJobAccepted: (expertId: string) => void;
  onClose: () => void;
}

const EmiCommandHandler: React.FC<EmiCommandHandlerProps> = ({
  serviceType,
  onJobAccepted,
  onClose,
}) => {
  const [loading, setLoading] = useState(true);
  const [experts, setExperts] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchExperts = async () => {
      try {
        const url = new URL('/api/experts', window.location.origin);
        url.searchParams.append('serviceType', serviceType);
        url.searchParams.append('limit', '5');
        
        const response = await fetch(url.toString().replace(/\/\/.*?@/, '//'));
        if (response.ok) {
          const data = await response.json();
          setExperts(data.experts || []);
        } else {
          console.error("Error response from experts API:", response.status);
        }
      } catch (error) {
        console.error("Error fetching experts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchExperts();
  }, [serviceType]);

  const handleViewDetails = (expertId: string) => {
    router.push(`/expert/info/${expertId}`);
  };

  const handleHireExpert = (expertId: string) => {
    onJobAccepted(expertId);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-xl w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Available {serviceType}s</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {loading ? (
          <div className="flex justify-center py-8">
            <span className="loading loading-bars loading-lg text-primary-green"></span>
          </div>
        ) : experts.length === 0 ? (
          <p className="text-center py-8">No {serviceType}s available at the moment.</p>
        ) : (
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {experts.map((expert) => (
              <div 
                key={expert._id} 
                className="border rounded-lg p-4 flex items-center"
              >
                <div className="mr-4">
                  <Image
                    src={expert.profileImage || "/assets/dummyImages/profilePic.png"}
                    alt={expert.firstName}
                    width={60}
                    height={60}
                    className="rounded-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold">{expert.firstName} {expert.lastName}</h3>
                  <p className="text-sm text-gray-600">{expert.services?.join(", ") || serviceType}</p>
                  <div className="flex items-center mt-1">
                    <div className="flex mr-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg
                          key={star}
                          className={`w-4 h-4 ${
                            star <= (expert.rating || 0) ? "text-yellow-400" : "text-gray-300"
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">({expert.reviews || 0} reviews)</span>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => handleViewDetails(expert._id)}
                    className="text-primary-green border border-primary-green px-3 py-1 rounded-md text-sm"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => handleHireExpert(expert._id)}
                    className="bg-primary-green text-white px-3 py-1 rounded-md text-sm"
                  >
                    Hire Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EmiCommandHandler;
