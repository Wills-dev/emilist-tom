import Image from "next/image";
import { useState } from "react";

import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const ImageSlider = ({ serviceInfo }: any) => {
  const [currentImage, setCurrentImage] = useState<number>(0);

  const prevImg = () => {
    const isFirstSlide = currentImage === 0;
    const newIndex = isFirstSlide
      ? serviceInfo?.businessImages.length - 1
      : currentImage - 1;
    setCurrentImage(newIndex);
  };

  const nextImg = () => {
    const isLastSlide = currentImage === serviceInfo?.businessImages.length - 1;
    const newIndex = isLastSlide ? 0 : currentImage + 1;
    setCurrentImage(newIndex);
  };

  return (
    <div className="col-span-3 max-lg:col-span-2 max-md:col-span-4 ">
      <div className="flex flex-col w-full gap-4 relative">
        <div className=" w-[676px] h-[413px] max-sm:w-[320px] max-sm:min-w-full max-sm:h-[226px] relative">
          <Image
            src={
              Array.isArray(serviceInfo?.businessImages) &&
              serviceInfo?.businessImages[currentImage]?.imageUrl
            }
            alt="service image"
            width={270}
            height={130}
            className="object-cover w-full h-full rounded-xl"
          />

          <button
            className="absolute top-1/2 translate-y-[-50%] -left-8 bg-white shadow-md rounded-full w-[68px] h-[68px] max-sm:w-[37px] max-sm:h-[37px] flex-c justify-center max-sm:-left-4 text-2xl"
            onClick={prevImg}
          >
            <IoIosArrowBack />
          </button>
          <button
            className="absolute top-1/2 translate-y-[-50%] -right-8 max-xl:-right-8 bg-white shadow-md rounded-full w-[68px] h-[68px] max-sm:w-[37px] max-sm:h-[37px] flex-c justify-center max-sm:-right-4 text-2xl"
            onClick={nextImg}
          >
            <IoIosArrowForward />
          </button>
        </div>

        <div className="flex gap-4 overflow-x-scroll w-full">
          {serviceInfo?.businessImages?.map((image: any, index: number) => (
            <Image
              key={index}
              src={image?.imageUrl}
              alt="logo"
              width={130}
              height={30}
              className={`${
                currentImage === index ? "opacity-100" : "opacity-50"
              } object-cover w-[122px] h-[122px] max-sm:w-[67px] max-sm:h-[67px] rounded-[14px]`}
              onClick={() => setCurrentImage(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageSlider;
