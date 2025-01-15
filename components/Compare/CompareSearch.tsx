import Link from "next/link";

const CompareSearch = () => {
  return (
    <div className="mt-4 ">
      <div className="flex justify-between items-center bg-[#f0fdf5] border-primary-green border-1 px-[3rem] py-2 rounded-lg max-sm:flex-col max-md:px-[1rem] max-sm:px-[0.5rem]  gap-2 text-center">
        {" "}
        <p className="text-[#303632] text-base font-[400] max-sm:text-[12px]">
          You have selected to compare services
        </p>{" "}
        <button className="bg-primary-green px-[18px] py-[5px] text-[#f6fdf9] rounded-[5px] cursor-pointer font-[400] font-exo whitespace-nowrap text-base max-sm:text-[12px]">
          <Link href="/compare" className="whitespace-nowrap">
            Compare Now
          </Link>
        </button>
      </div>
    </div>
  );
};

export default CompareSearch;
