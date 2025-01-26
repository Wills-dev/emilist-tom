"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { AnimatePresence, motion } from "framer-motion";

import StarRating from "../StarRating/StarRating";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const ReviewSlider = ({ reviews }: any) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalReviews = reviews.length;

  useEffect(() => {
    const interval = setInterval(() => {
      nextReview();
    }, 6000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const nextReview = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalReviews);
  };

  const prevReview = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + totalReviews) % totalReviews
    );
  };

  return (
    <div className="relative max-w-[676px] w-full shadow rounded-lg border-1 border-gray-300 p-2">
      <button
        onClick={prevReview}
        className="rounded-full bg-white p-2 shadow-lg hover:bg-gray-100 transition absolute -left-4 top-1/3 z-10"
      >
        <IoIosArrowBack />
      </button>
      <button
        onClick={nextReview}
        className="rounded-full bg-white p-2 shadow-lg hover:bg-gray-100 transition absolute -right-4 top-1/3 z-10"
      >
        <IoIosArrowForward />
      </button>

      <AnimatePresence mode="wait">
        <motion.div
          key={reviews[currentIndex].id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.5 }}
          className="p-4 bg-white  flex gap-4"
        >
          {reviews[currentIndex].userId?.profileImage ? (
            <Image
              width={20}
              height={20}
              src={reviews[currentIndex].userId?.profileImage}
              alt="profile pic"
              className="sm:w-12 w-10 sm:h-12 h-10 object-cover  rounded-full"
            />
          ) : (
            <p className="sm:w-12 w-10 sm:h-12 h-10 rounded-full bg-slate-200 flex-c justify-center font-bold">
              {reviews[currentIndex].userId?.userName?.[0]?.toUpperCase()}
            </p>
          )}
          <div className="">
            <div className="flex-c gap-4 flex-wrap">
              <h3 className="font-semibold">
                {" "}
                {reviews[currentIndex]?.userId?.fullName
                  ? reviews[currentIndex]?.userId?.fullName
                  : reviews[currentIndex]?.userId?.userName}
              </h3>
              <div className="flex items-center">
                <StarRating rating={reviews[currentIndex].rating} />
                <span className="ml-2 text-gray-500">
                  {reviews[currentIndex].rating}
                </span>
              </div>
            </div>
            <p className="text-gray-500 mt-2">
              {reviews[currentIndex].comment}
            </p>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default ReviewSlider;
