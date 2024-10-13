import React from "react";

const HeroBanner = () => {
  return (
    <section className="pt-28 max-lg:pt-24">
      <div className="bg-become-expert-banner w-full h-[60vh] bg-cover bg-no-repeat bg-center">
        <div className="flex items-center w-full justify-end h-full max-md:justify-center">
          <h1 className="text-white font-extrabold text-6xl leading-normal max-md:mr-0 max-sm:text-3xl mr-32 max-md:hidden">
            Emilist Private <br />
            Experts
          </h1>
          <h1 className="text-white font-extrabold text-6xl leading-normal max-md:mr-0 max-sm:text-3xl md:hidden">
            Emilist Private Experts
          </h1>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
