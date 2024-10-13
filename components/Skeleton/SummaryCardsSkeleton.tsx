import React from "react";
import { Skeleton } from "../ui/skeleton";

const SummaryCardsSkeleton = () => {
  return (
    <>
      <div className="w-[193px] max-w-[193px] min-w-[193px] rounded-lg  max-sm:max-w-[192px] max-sm:min-w-[192px] max-sm:w-[192px] ">
        <Skeleton className="w-full sm:h-32 h-28 bg-slate-200" />
      </div>
      <div className="w-[193px] max-w-[193px] min-w-[193px] rounded-lg  max-sm:max-w-[192px] max-sm:min-w-[192px] max-sm:w-[192px] ">
        <Skeleton className="w-full sm:h-32 h-28 bg-slate-200" />
      </div>
      <div className="w-[193px] max-w-[193px] min-w-[193px] rounded-lg  max-sm:max-w-[192px] max-sm:min-w-[192px] max-sm:w-[192px] ">
        <Skeleton className="w-full sm:h-32 h-28 bg-slate-200" />
      </div>
      <div className="w-[193px] max-w-[193px] min-w-[193px] rounded-lg  max-sm:max-w-[192px] max-sm:min-w-[192px] max-sm:w-[192px] ">
        <Skeleton className="w-full sm:h-32 h-28 bg-slate-200" />
      </div>
      <div className="w-[193px] max-w-[193px] min-w-[193px] rounded-lg  max-sm:max-w-[192px] max-sm:min-w-[192px] max-sm:w-[192px] ">
        <Skeleton className="w-full sm:h-32 h-28 bg-slate-200" />
      </div>
      <div className="w-[193px] max-w-[193px] min-w-[193px] rounded-lg  max-sm:max-w-[192px] max-sm:min-w-[192px] max-sm:w-[192px] ">
        <Skeleton className="w-full sm:h-32 h-28 bg-slate-200" />
      </div>
    </>
  );
};

export default SummaryCardsSkeleton;
