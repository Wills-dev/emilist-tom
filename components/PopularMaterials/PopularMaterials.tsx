import Link from "next/link";

import dynamic from "next/dynamic";
import PopularSection from "../Skeleton/PopularSection";

const MaterialHomeData = dynamic(
  () => import("../HomeComponents/MaterialHomeData"),
  {
    loading: () => <PopularSection bgColor="bg-slate-200" />,
  }
);

type Props = {
  bgColor?: string;
};

const PopularMaterials = ({ bgColor }: Props) => {
  return (
    <section className={`${bgColor} padding-y`}>
      <div className=" padding-l-ctn">
        <div className="flex-c-b pr-6">
          <h2 className="text-3xl text-gray-900 font-bold max-md:text-xl ">
            Materials you may need
          </h2>
          <Link
            href="/dashboard/material"
            className="text-primary-green hover:underline transition-all duration-300"
          >
            See more
          </Link>
        </div>
        <MaterialHomeData />
      </div>
    </section>
  );
};

export default PopularMaterials;
