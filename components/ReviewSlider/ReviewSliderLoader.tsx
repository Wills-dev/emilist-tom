import { Skeleton } from "../ui/skeleton";

const ReviewSliderLoader = () => {
  return (
    <div className=" max-w-[676px] h-28 w-full rounded-lg">
      <Skeleton className="h-full w-full rounded-lg  bg-slate-200" />
    </div>
  );
};

export default ReviewSliderLoader;
