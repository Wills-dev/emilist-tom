import { Skeleton } from "../ui/skeleton";

const JobSkeleton = () => {
  return (
    <>
      {["", "", "", "", "", "", "", ""].map((skeleton, index) => (
        <div key={index} className=" w-80 min-w-80 h-40">
          <Skeleton className={`h-full w-full rounded-lg ${"bg-slate-200"}`} />
        </div>
      ))}
    </>
  );
};

export default JobSkeleton;
