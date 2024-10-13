const OverdueProjects = () => {
  return (
    <div className="grid grid-cols-3 gap-5 mt-10">
      <div className="col-span-2 w-full min-w-full max-md:col-span-3 border-[1px] border-[#D0CFCF] rounded-[10px] p-6 max-sm:px-3 flex justify-between items-center max-md:flex-col gap-4 max-md:justify-start max-md:items-start">
        <div className="flex ">
          <h6 className="text-[#030A05]  text-[20px] font-[600] leading-[28px] max-sm:text-[16px] max-sm:leading-[20px]">
            Interior painter for a 3bed room flat
          </h6>
        </div>
        <div className="rounded-[20px] flex justify-end items-center gap-8 max-sm:gap-3">
          <div className="flex flex-col gap-2">
            <p className="text-[#5E625F]  text-[14px] font-[500] leading-[16px] max-sm:text-[12px] whitespace-nowrap">
              Milestone
            </p>
            <h6 className="text-[#303632]  text-[16px] font-[700] leading-[24px] max-sm:text-[13px]  whitespace-nowrap">
              1/4
            </h6>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-[#5E625F]  text-[14px] font-[500] leading-[16px] max-sm:text-[12px] whitespace-nowrap">
              Due date
            </p>
            <div className=" flex items-center justify-center bg-[#FFF1F2] w-[85px] h-[30px] max-sm:h-[25px] max-sm:w-[70px] rounded-[20px] ">
              <p className="text-[#FF5D7A]  text-[14px] font-[500] leading-[16px] max-sm:text-[12px] whitespace-nowrap">
                6 days ago
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverdueProjects;
