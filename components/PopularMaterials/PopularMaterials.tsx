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
      <div className=" padding-l">
        <h2 className="text-3xl text-gray-900 font-bold max-md:text-xl ">
          Materials you may need
        </h2>
        <MaterialHomeData />
      </div>
    </section>
  );
};

export default PopularMaterials;
