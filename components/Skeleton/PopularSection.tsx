import { Skeleton } from "../ui/skeleton";

interface PopularSectionProps {
  bgColor?: string;
}

const PopularSection = ({ bgColor }: PopularSectionProps) => {
  return (
    <div className="flex items-center w-full overflow-x-scroll gap-4 py-4 hide-scrollbar">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <div className="max-w-[400px] w-96 max-md:w-72 h-64 max-md:h-52 rounded-lg ">
            <Skeleton
              className={`h-full w-full rounded-lg ${
                bgColor ? bgColor : "bg-slate-200"
              }`}
            />
          </div>
          <div className="">
            <Skeleton
              className={`h-8 w-48 rounded  ${
                bgColor ? bgColor : "bg-slate-200"
              }`}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <div className="max-w-[400px] w-96 max-md:w-72 h-64 max-md:h-52 rounded-lg ">
            <Skeleton
              className={`h-full w-full rounded-lg ${
                bgColor ? bgColor : "bg-slate-200"
              }`}
            />
          </div>
          <div className="">
            <Skeleton
              className={`h-8 w-48 rounded  ${
                bgColor ? bgColor : "bg-slate-200"
              }`}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <div className="max-w-[400px] w-96 max-md:w-72 h-64 max-md:h-52 rounded-lg ">
            <Skeleton
              className={`h-full w-full rounded-lg ${
                bgColor ? bgColor : "bg-slate-200"
              }`}
            />
          </div>
          <div className="">
            <Skeleton
              className={`h-8 w-48 rounded  ${
                bgColor ? bgColor : "bg-slate-200"
              }`}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <div className="max-w-[400px] w-96 max-md:w-72 h-64 max-md:h-52 rounded-lg ">
            <Skeleton
              className={`h-full w-full rounded-lg ${
                bgColor ? bgColor : "bg-slate-200"
              }`}
            />
          </div>
          <div className="">
            <Skeleton
              className={`h-8 w-48 rounded  ${
                bgColor ? bgColor : "bg-slate-200"
              }`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopularSection;
