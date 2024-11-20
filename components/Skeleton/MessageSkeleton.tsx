import React from "react";
import { Skeleton } from "../ui/skeleton";

const MessageSkeleton = () => {
  return (
    <>
      {" "}
      <div className=" h-12 w-full rounded-lg sm:px-6 px-2 my-2">
        <Skeleton className={`h-full w-full rounded-l bg-slate-200`} />
      </div>
      <div className=" h-12 w-full rounded-lg sm:px-6 px-2 my-2">
        <Skeleton className={`h-full w-full rounded-l bg-slate-200`} />
      </div>
      <div className=" h-12 w-full rounded-lg sm:px-6 px-2 my-2">
        <Skeleton className={`h-full w-full rounded-l bg-slate-200`} />
      </div>
      <div className=" h-12 w-full rounded-lg sm:px-6 px-2 my-2">
        <Skeleton className={`h-full w-full rounded-l bg-slate-200`} />
      </div>
      <div className=" h-12 w-full rounded-lg sm:px-6 px-2 my-2">
        <Skeleton className={`h-full w-full rounded-l bg-slate-200`} />
      </div>
    </>
  );
};

export default MessageSkeleton;
