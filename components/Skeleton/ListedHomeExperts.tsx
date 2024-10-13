import React from "react";
import { Skeleton } from "../ui/skeleton";

const ListedHomeExperts = () => {
  return (
    <div className=" flex flex-col mt-4">
      <div className=" w-full border-b-1 px-6 py-4">
        <div className="flex gap-2 w-full ">
          <Skeleton className=" w-20 h-20 rounded-full shadow bg-slate-200" />
          <div className="flex flex-col flex-1">
            <Skeleton className="w-2/3 h-6 bg-slate-200" />
            <div className="w-full mt-3">
              <Skeleton className="w-full h-4 bg-slate-200" />
              <Skeleton className="w-full h-4 bg-slate-200 mt-1" />
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-6">
          <Skeleton className="w-20 h-4 bg-slate-200" />
          <Skeleton className="w-20 h-4 bg-slate-200" />
        </div>
      </div>
      <div className=" w-full border-b-1 px-6 py-4">
        <div className="flex gap-2 w-full ">
          <Skeleton className=" w-20 h-20 rounded-full shadow bg-slate-200" />
          <div className="flex flex-col flex-1">
            <Skeleton className="w-2/3 h-6 bg-slate-200" />
            <div className="w-full mt-3">
              <Skeleton className="w-full h-4 bg-slate-200" />
              <Skeleton className="w-full h-4 bg-slate-200 mt-1" />
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-6">
          <Skeleton className="w-20 h-4 bg-slate-200" />
          <Skeleton className="w-20 h-4 bg-slate-200" />
        </div>
      </div>
      <div className=" w-full border-b-1 px-6 py-4">
        <div className="flex gap-2 w-full ">
          <Skeleton className=" w-20 h-20 rounded-full shadow bg-slate-200" />
          <div className="flex flex-col flex-1">
            <Skeleton className="w-2/3 h-6 bg-slate-200" />
            <div className="w-full mt-3">
              <Skeleton className="w-full h-4 bg-slate-200" />
              <Skeleton className="w-full h-4 bg-slate-200 mt-1" />
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-6">
          <Skeleton className="w-20 h-4 bg-slate-200" />
          <Skeleton className="w-20 h-4 bg-slate-200" />
        </div>
      </div>
      <div className=" w-full border-b-1 px-6 py-4">
        <div className="flex gap-2 w-full ">
          <Skeleton className=" w-20 h-20 rounded-full shadow bg-slate-200" />
          <div className="flex flex-col flex-1">
            <Skeleton className="w-2/3 h-6 bg-slate-200" />
            <div className="w-full mt-3">
              <Skeleton className="w-full h-4 bg-slate-200" />
              <Skeleton className="w-full h-4 bg-slate-200 mt-1" />
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-6">
          <Skeleton className="w-20 h-4 bg-slate-200" />
          <Skeleton className="w-20 h-4 bg-slate-200" />
        </div>
      </div>
    </div>
  );
};

export default ListedHomeExperts;
