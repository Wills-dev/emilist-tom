import Image from "next/image";

const InsightContent = () => {
  return (
    <section className="py-28 padding-x">
      <div className="flex gap-1 overflow-x-scroll w-full">
        <div className="w-[505px] max-w-[505px] min-w-[505px] h-[285px] max-sm:h-[250px] max-sm:max-w-[450px] max-sm:w-[450px] shadow-md rounded-[10px] m-2 p-6 py-8">
          <h2 className="font-bold text-xl max-sm: mb-6">Overview</h2>
          <div className="grid grid-cols-6 gap-6">
            <div className="col-span-2 flex gap-2 items-start">
              <Image
                src="/assets/icons/document-forward.svg"
                alt="logo"
                width={20}
                height={20}
                className="object-contain w-6 h-6 mt-1"
              />
              <div className="flex flex-col gap-3">
                <h6 className="font-semibold text-lg max-sm:text-sm">121</h6>
                <p className="text-[#474C48] max-sm:text-xs ">Reached</p>
              </div>
            </div>
            <div className="col-span-2 flex gap-2 items-start">
              <Image
                src="/assets/icons/heart2.svg"
                alt="logo"
                width={20}
                height={20}
                className="object-contain w-6 h-6 mt-1"
              />
              <div className="flex flex-col gap-3">
                <h6 className="font-semibold text-lg max-sm:text-sm">10</h6>
                <p className="text-[#474C48] max-sm:text-xs ">Saved</p>
              </div>
            </div>
            <div className="col-span-2 flex gap-2 items-start">
              <Image
                src="/assets/icons/share.svg"
                alt="logo"
                width={20}
                height={20}
                className="object-contain w-6 h-6 mt-1"
              />
              <div className="flex flex-col gap-3">
                <h6 className="font-semibold text-lg max-sm:text-sm">5</h6>
                <p className="text-[#474C48] max-sm:text-xs ">Share</p>
              </div>
            </div>
            <div className="col-span-2 flex gap-2 items-start">
              <Image
                src="/assets/icons/mouse-square.svg"
                alt="logo"
                width={20}
                height={20}
                className="object-contain w-6 h-6 mt-1"
              />
              <div className="flex flex-col gap-3">
                <h6 className="font-semibold text-lg max-sm:text-sm">38</h6>
                <p className="text-[#474C48] max-sm:text-xs ">Clicks</p>
              </div>
            </div>
            <div className="col-span-2 flex gap-2 items-start">
              <Image
                src="/assets/icons/document-upload.svg"
                alt="logo"
                width={20}
                height={20}
                className="object-contain w-6 h-6 mt-1"
              />
              <div className="flex flex-col gap-3">
                <h6 className="font-semibold text-lg max-sm:text-sm">38</h6>
                <p className="text-[#474C48] max-sm:text-xs ">Contacts</p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[349px] max-w-[349px] min-w-[349px] h-[285px] max-sm:max-w-[320px] max-sm:h-[250px] max-sm:w-[320px] shadow-md rounded-[10px] m-2 p-6 py-8">
          <h2 className="font-bold sm:text-xl max-sm: mb-10">
            Promotion Duration
          </h2>
          <div className="w-full my-8">
            <div className="flex justify-between items-center w-full">
              <h6 className=" font-medium mb-1 max-sm:text-xs">21/30</h6>
              <h6 className=" font-medium mb-1 max-sm:text-xs">7 Days Left</h6>
            </div>
            <div className="flex items-center w-full gap-4">
              <div className="w-full max-w-full h-[8px] rounded-[10px] bg-[#D0CFCF]">
                <div className="h-full w-[70%] bg-[#054753] rounded-[10px]"></div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center w-full">
            <button className="bg-primary-green w-[151px] py-3 text-[#fcfefd] rounded-[10px] cursor-pointer font-bold whitespace-nowrap min-w-[210px]">
              Add More Subscription
            </button>
          </div>
        </div>
        <div className="w-[349px] max-w-[349px] min-w-[349px] h-[285px] max-sm:max-w-[320px] max-sm:h-[250px] max-sm:w-[320px] shadow-md rounded-[10px] m-2 p-6 py-8">
          <h2 className="font-bold sm:text-xl max-sm: mb-10">Clicks</h2>
          <div className="w-full my-8">
            <div className="flex justify-between items-center w-full">
              <h6 className=" font-medium mb-1 max-sm:text-xs">1,350/2,000</h6>
              <h6 className=" font-medium mb-1 max-sm:text-xs">
                650 Clicks Left
              </h6>
            </div>
            <div className="flex items-center w-full gap-4">
              <div className="w-full max-w-full h-[8px] rounded-[10px] bg-[#D0CFCF]">
                <div className="h-full w-[70%] bg-[#054753] rounded-[10px]"></div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center w-full">
            <button className="bg-primary-green w-[151px] py-3 text-[#fcfefd] rounded-[10px] cursor-pointer font-bold whitespace-nowrap min-w-[210px]">
              Add More Subscription
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InsightContent;
