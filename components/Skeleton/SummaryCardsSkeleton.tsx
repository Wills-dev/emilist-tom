import React from "react";
import { Skeleton } from "../ui/skeleton";

const SummaryCardsSkeleton = () => {
  return (
    <>
      <div className="w-[340px] max-w-[340px] min-w-[340px] rounded-lg max-sm:max-w-full max-sm:min-w-[300px] max-sm:w-[340px]">
        <Skeleton className="w-full sm:h-32 h-28 bg-slate-200" />
      </div>
      <div className="w-[340px] max-w-[340px] min-w-[340px] rounded-lg max-sm:max-w-full max-sm:min-w-[300px] max-sm:w-[340px]">
        <Skeleton className="w-full sm:h-32 h-28 bg-slate-200" />
      </div>
      <div className="w-[340px] max-w-[340px] min-w-[340px] rounded-lg max-sm:max-w-full max-sm:min-w-[300px] max-sm:w-[340px]">
        <Skeleton className="w-full sm:h-32 h-28 bg-slate-200" />
      </div>
      <div className="w-[340px] max-w-[340px] min-w-[340px] rounded-lg max-sm:max-w-full max-sm:min-w-[300px] max-sm:w-[340px]">
        <Skeleton className="w-full sm:h-32 h-28 bg-slate-200" />
      </div>
      <div className="w-[340px] max-w-[340px] min-w-[340px] rounded-lg max-sm:max-w-full max-sm:min-w-[300px] max-sm:w-[340px]">
        <Skeleton className="w-full sm:h-32 h-28 bg-slate-200" />
      </div>
      <div className="w-[340px] max-w-[340px] min-w-[340px] rounded-lg max-sm:max-w-full max-sm:min-w-[300px] max-sm:w-[340px]">
        <Skeleton className="w-full sm:h-32 h-28 bg-slate-200" />
      </div>
    </>
  );
};

export default SummaryCardsSkeleton;
