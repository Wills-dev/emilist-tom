import dynamic from "next/dynamic";
import PopularSection from "../Skeleton/PopularSection";
import Link from "next/link";

const JobHomeData = dynamic(() => import("../HomeComponents/JobHomeData"), {
  loading: () => <PopularSection />,
});

const PopularJobs = () => {
  return (
    <section className="padding-y ">
      <div className=" padding-l">
        <div className="flex-c-b pr-6">
          {" "}
          <h2 className="text-3xl text-gray-900 font-bold max-md:text-xl ">
            Find jobs around you
          </h2>
          <Link
            href="/find-job"
            className="text-primary-green hover:underline transition-all duration-300"
          >
            See more
          </Link>
        </div>

        <JobHomeData />
      </div>
    </section>
  );
};

export default PopularJobs;
