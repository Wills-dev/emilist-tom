"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

const MainSearch = () => {
  const [serviceName, setServiceName] = useState<string>("");
  const router = useRouter();

  const handleSearch = (e: any) => {
    e.preventDefault();

    if (!serviceName.trim()) {
      return;
    }

    // Build the query string dynamically
    const query = new URLSearchParams({
      ...(serviceName && { q: serviceName.trim() }),
    }).toString();

    // Navigate to the search page with the query
    router.push(`/catalog/services?${query}`);
  };

  return (
    <form
      className="max-w-96 w-full flex px-3 h-12 border-1 border-gray-400 rounded-lg focus-within:border-primary-green"
      onSubmit={(e) => handleSearch(e)}
    >
      <input
        type="search"
        name="search"
        id="search"
        placeholder="Search for services (e.g., carpenter)"
        className="flex-1 bg-inherit outline-none"
        value={serviceName}
        onChange={(e) => setServiceName(e.target.value)}
      />
      <button type="submit">
        <Image
          src="/assets/icons/Group 26929.svg"
          width={20}
          height={20}
          alt="submit icon"
          className="object-contain w-8 h-8"
        />
      </button>
    </form>
  );
};

export default MainSearch;
