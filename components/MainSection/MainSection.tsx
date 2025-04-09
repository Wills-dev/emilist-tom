import Image from "next/image";

import ImageOne from "../../public/assets/images/Vector 262.png";
import ImageTwo from "../../public/assets/images/Vector 262 (1).png";
import ImageThree from "../../public/assets/images/Vector 263.png";
import ImageFour from "../../public/assets/images/Vector 263 (1).png";
import ImageFive from "../../public/assets/images/Vector 264.png";
import ImageSix from "../../public/assets/images/Vector 264 (1).png";
import MainSearch from "../MainSearch/MainSearch";

const MainSection = () => {
  return (
    <section className="pt-28 relative w-full">
      <div className="w-full padding-ctn">
        <div className="flex justify-between max-lg:flex-col md:gap-10 gap-6 md:border-1 md:p-6 border-gray-300 rounded-2xl">
          <div className="flex lg:flex-col max-lg:justify-between max-lg:gap-2">
            <div className="">
              <Image
                src={ImageOne}
                placeholder="blur"
                alt="hero images"
                className=""
              />
            </div>
            <div className="">
              <Image
                src={ImageThree}
                placeholder="blur"
                alt="hero images"
                className=""
              />
            </div>
            <div className="">
              <Image
                src={ImageFive}
                placeholder="blur"
                alt="hero images"
                className=""
              />
            </div>
          </div>
          <div className="flex-1 w-full flex justify-center">
            <div className="max-w-lg space-y-7 flex flex-col  justify-center">
              <h1 className="md:text-5xl text-3xl font-bold text-center leading-normal">
                Discover Your Project Dream Team Here.
              </h1>
              <p className="text-center">
                This platform connects homeowners, contractors, businesses, and
                customers with skilled artisans, handymen, and project experts
                for renovations, custom-builds, and repairs.
              </p>
              <div className="w-full flex justify-center pt-5">
                <MainSearch />
              </div>
            </div>
          </div>
          <div className="flex lg:flex-col max-lg:justify-between max-lg:gap-2">
            <div className="">
              <Image
                src={ImageTwo}
                placeholder="blur"
                alt="hero images"
                className=""
              />
            </div>
            <div className="">
              <Image
                src={ImageFour}
                placeholder="blur"
                alt="hero images"
                className=""
              />
            </div>
            <div className="">
              <Image
                src={ImageSix}
                placeholder="blur"
                alt="hero images"
                className=""
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MainSection;
