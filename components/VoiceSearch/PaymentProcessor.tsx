"use client";

import React, { useState } from "react";
import { useCheckoutCart } from "@/hooks/useCheckoutCart";

interface PaymentProcessorProps {
  jobId: string;
  onComplete: (trackingInfo: any) => void;
  onClose: () => void;
}

const PaymentProcessor: React.FC<PaymentProcessorProps> = ({
  jobId,
  onComplete,
  onClose,
}) => {
  const [loading, setLoading] = useState(false);
  const { paymentMethod, setPaymentMethod, currency, setCurrency, handleOrderPayment } = useCheckoutCart();

  const handlePayment = async () => {
    setLoading(true);
    try {
      try {
        await handleOrderPayment(jobId);
      } catch (error) {
        console.error("Payment API error:", error);
      }
      
      const trackingInfo = {
        jobId,
        status: "paid",
        paymentMethod: paymentMethod || "Card",
        startDate: new Date().toISOString(),
        estimatedCompletionDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
      };
      onComplete(trackingInfo);
    } catch (error) {
      console.error("Payment error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Payment</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Payment Method
            </label>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="expert-reg-input"
              required
            >
              <option value="">Select payment method</option>
              <option value="Card">Card</option>
              <option value="Wallet">Wallet</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Currency
            </label>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="expert-reg-input"
              required
            >
              <option value="">Select currency</option>
              <option value="USD">USD</option>
              <option value="NGN">NGN</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
            </select>
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
            onClick={handlePayment}
            className="px-4 py-2 bg-primary-green text-white rounded-md text-sm font-medium hover:bg-green-600"
            disabled={loading || !paymentMethod || !currency}
          >
            {loading ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              "Process Payment"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentProcessor;
