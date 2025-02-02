"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { CiLocationOn, CiSearch } from "react-icons/ci";

interface HeroSectionSearchProps {
  currentLink: number;
}

const HeroSectionSearch = ({ currentLink }: HeroSectionSearchProps) => {
  const [location, setLocation] = useState<string>("");
  const [serviceName, setServiceName] = useState<string>("");
  const router = useRouter();

  const handleSearch = (e: any) => {
    e.preventDefault();
    // Validation: Ensure at least one input is provided
    if (!location.trim() && !serviceName.trim()) {
      return;
    }

    // Build the query string dynamically
    const query = new URLSearchParams({
      ...(serviceName && { q: serviceName.trim() }),
      ...(location && { location: location.trim() }),
    }).toString();

    // Navigate to the search page with the query
    if (currentLink === 3) {
      router.push(`/catalog/materials?${query}`);
    } else {
      router.push(`/catalog/services?${query}`);
    }
  };
  return (
    <form
      className="w-full max-w-full flex-c-b mb-10 shadow-lg max-lg:max-w-[770px] h-12"
      onSubmit={(e) => handleSearch(e)}
    >
      <div className="gap-2 flex-1 flex-c px-2 rounded-l-lg  border-light-gray border-1 focus-within:border-primary-green h-full  max-lg:h-12 ">
        <span className="text-xl">
          <CiSearch />
        </span>
        <input
          type="text"
          placeholder="Enter Keyword"
          className="focus:outline-none max-sm:text-sm flex-1 bg-white"
          value={serviceName}
          onChange={(e) => setServiceName(e.target.value)}
        />
      </div>
      <div className=" sm:flex-c-b w-full h-full max-lg:h-12 flex-1 hidden">
        <div className="flex-c gap-2 flex-1 px-2 border-y-1 border-light-gray focus-within:border-primary-green focus-within:border-1 w-full h-full">
          <span className="text-xl">
            <CiLocationOn />
          </span>
          <input
            type="text"
            placeholder="Enter Location"
            className="focus:outline-none max-sm:text-sm flex-1 bg-white h-full"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
      </div>

      <button
        type="submit"
        className="bg-primary-green w-full h-full border-primary-green border-1 rounded-r-lg text-white  max-sm:text-sm"
      >
        Search
      </button>
    </form>
  );
};

export default HeroSectionSearch;
