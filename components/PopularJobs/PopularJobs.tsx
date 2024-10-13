import dynamic from "next/dynamic";
import PopularSection from "../Skeleton/PopularSection";

const JobHomeData = dynamic(() => import("../HomeComponents/JobHomeData"), {
  loading: () => <PopularSection />,
});

const PopularJobs = () => {
  return (
    <section className="padding-y ">
      <div className=" padding-l">
        <h2 className="text-3xl text-gray-900 font-bold max-md:text-xl ">
          Find jobs around you
        </h2>
        <JobHomeData />
      </div>
    </section>
  );
};

export default PopularJobs;
