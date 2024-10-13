"use client";

import Link from "next/link";
// import { useSearchParams, useRouter } from "next/navigation";

import { CiLocationOn, CiSearch } from "react-icons/ci";

const HeroSectionSearch = () => {
  // const searchParams = useSearchParams();
  // const { replace } = useRouter();

  function handleSearch(term: string) {
    // const params = new URLSearchParams(searchParams);
    // console.log(term);
    // if (term) {
    //   params.set("q", term);
    // } else {
    //   params.delete("q");
    // }
    // replace(`/catalog/services?${params.toString()}`);
  }
  return (
    <form className="w-full max-w-full flex-c-b mb-10 shadow-lg max-lg:max-w-[770px] h-12">
      <div className="gap-2 flex-1 flex-c px-2 rounded-l-lg  border-light-gray border-1 focus-within:border-primary-green h-full  max-lg:h-12 ">
        <span className="text-xl">
          <CiSearch />
        </span>
        <input
          type="text"
          placeholder="Enter Keyword"
          className="focus:outline-none max-sm:text-sm flex-1 bg-white"
          onChange={(e) => {
            handleSearch(e.target.value);
          }}
        />
      </div>
      <div className=" sm:flex-c-b w-full h-full max-lg:h-12 flex-1 hidden">
        <div className="flex-c gap-2 flex-1 px-2 border-y-1 border-light-gray focus-within:border-primary-green focus-within:border-1 w-full h-full">
          <span className="text-xl">
            <CiLocationOn />
          </span>
          <input
            type="text"
            placeholder="Enter location"
            className="focus:outline-none max-sm:text-sm flex-1 bg-white h-full"
          />
        </div>
      </div>
      <Link
        href="/catalog/expert"
        className=" w-32 max-sm:w-24 h-full max-lg:h-12"
      >
        <button className="bg-primary-green w-full h-full border-primary-green border-1 rounded-r-lg text-white  max-sm:text-sm">
          Search
        </button>
      </Link>
    </form>
  );
};

export default HeroSectionSearch;
