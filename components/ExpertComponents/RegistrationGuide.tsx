const RegistrationGuide = () => {
  return (
    <div className="pt-24 h-screen max-h-screen bg-[#054753] text-white w-[500px] max-md:w-full pb-24 md:fixed">
      <div className="padding-y pr-8 max-sm:mt-10">
        <h1 className="font-bold text-3xl padding-l max-sm:text-xl">
          Grow your business with Emilist
        </h1>
        <div className="flex flex-col justify-center mt-10 padding-x gap-10">
          <div className="flex gap-2">
            <div className="">
              <h2 className="flex-c sm:w-10 sm:h-10 bg-white rounded-full justify-center  font-inter font-semibold sm:text-lg w-8 h-8 text-gray-600">
                1
              </h2>
            </div>
            <div className="">
              <h5 className="font-inter font-semibold sm:text-lg  mb-3">
                Build your profile
              </h5>
              <p className="sm:text-sm text-xs">
                Add a winning profile with reviews from your previous customers,
                prices, and featured projects.
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <div className="">
              <h2 className="flex-c sm:w-10 sm:h-10 bg-white rounded-full justify-center  font-inter font-semibold sm:text-lg w-8 h-8 text-gray-600">
                2
              </h2>
            </div>
            <div className="flex-1">
              <h5 className="font-inter font-semibold sm:text-lg  mb-3">
                Create a custom job pipeline.
              </h5>
              <p className="sm:text-sm text-xs">
                Tell us the kinds of jobs you want. Customers will reach out
                with jobs matching your exact specifications.
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <div className="">
              <h2 className="flex-c sm:w-10 sm:h-10 bg-white rounded-full justify-center  font-inter font-semibold sm:text-lg w-8 h-8 text-gray-600">
                3
              </h2>
            </div>
            <div className="flex-1">
              <h5 className="font-inter font-semibold sm:text-lg  mb-3">
                Get quality jobs from new customers.
              </h5>
              <p className="sm:text-sm text-xs">
                All iobs on EmiList come with the customer's phone number, and
                we ensure limited competition from other experts.
              </p>
            </div>
          </div>
        </div>
        <div className="w-full flex-c justify-center mt-10">
          <a href="#new-expert" className="custom-btn md:hidden">
            Proceed
          </a>
        </div>
      </div>
    </div>
  );
};

export default RegistrationGuide;
