"use client";

import { useEffect, useState } from "react";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import StarRating from "../StarRating/StarRating";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

type Review = {
  id: number;
  name: string;
  rating: number;
  review: string;
  avatar: string;
};

const reviews: Review[] = [
  {
    id: 1,
    name: "Olamide Komolafe",
    rating: 4,
    review:
      "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enimtest sit aliqua dolor do amet sint. Velit off...",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: 2,
    name: "John Doe",
    rating: 5,
    review:
      "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enimtest sit aliqua dolor do amet sint. Velit off...",
    avatar: "https://randomuser.me/api/portraits/men/64.jpg",
  },
  {
    id: 3,
    name: "Jane Smith",
    rating: 3,
    review:
      "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enimtest sit aliqua dolor do amet sint. Velit off...",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
  },
];

const ReviewSlider = () => {
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
          <Image
            width={20}
            height={20}
            src="/assets/dummyImages/profilePic.png"
            alt={reviews[currentIndex].name}
            className="w-12 h-12 rounded-full"
          />
          <div className="">
            <div className="flex-c gap-4 flex-wrap">
              <h3 className="font-semibold">{reviews[currentIndex].name}</h3>
              <div className="flex items-center">
                <StarRating rating={reviews[currentIndex].rating} />
                <span className="ml-2 text-gray-500">
                  {reviews[currentIndex].rating}
                </span>
              </div>
            </div>
            <p className="text-gray-500 mt-2">{reviews[currentIndex].review}</p>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default ReviewSlider;
