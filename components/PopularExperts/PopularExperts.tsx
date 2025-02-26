import Link from "next/link";

import dynamic from "next/dynamic";
import PopularSection from "../Skeleton/PopularSection";

const ExpertHomeData = dynamic(
  () => import("../HomeComponents/ExpertHomeData"),
  {
    loading: () => <PopularSection />,
  }
);

const PopularExperts = () => {
  return (
    <section className="padding-y no-scroll">
      <div className=" padding-l">
        <div className="flex-c-b pr-6">
          <h2 className="text-3xl text-gray-900 font-bold max-md:text-xl ">
            Popular services around you
          </h2>
          <Link
            href="/dashboard/expert"
            className="text-primary-green hover:underline transition-all duration-300"
          >
            See more
          </Link>
        </div>

        <ExpertHomeData />
      </div>
    </section>
  );
};

export default PopularExperts;
