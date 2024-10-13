import Image from "next/image";
import { useState } from "react";

import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

interface ImageSliderProps {
  materialInfo: any;
}

const ImageSlider = ({ materialInfo }: ImageSliderProps) => {
  const [currentImage, setCurrentImage] = useState<number>(0);

  const prevImg = () => {
    const isFirstSlide = currentImage === 0;
    const newIndex = isFirstSlide
      ? materialInfo?.Images?.length - 1
      : currentImage - 1;
    setCurrentImage(newIndex);
  };

  const nextImg = () => {
    const isLastSlide = currentImage === materialInfo?.Images?.length - 1;
    const newIndex = isLastSlide ? 0 : currentImage + 1;
    setCurrentImage(newIndex);
  };

  return (
    <div className="col-span-3 max-lg:col-span-2 max-md:col-span-4 flex flex-col gap-4 relative">
      <div className=" w-[676px] h-[413px] max-sm:w-[320px] max-sm:min-w-full max-sm:h-[226px] relative">
        <Image
          src={
            materialInfo?.Images[currentImage] &&
            materialInfo?.Images[currentImage]
          }
          alt="logo"
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
        {materialInfo?.Images?.map((image: string, index: number) => (
          <Image
            key={index}
            src={image && image}
            alt="logo"
            width={130}
            height={30}
            className={`${
              currentImage === index ? "opacity-100" : "opacity-50"
            } object-cover w-[122px] h-[122px] max-sm:w-[67px] max-sm:h-[67px] rounded-lg cursor-pointer`}
            onClick={() => setCurrentImage(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
