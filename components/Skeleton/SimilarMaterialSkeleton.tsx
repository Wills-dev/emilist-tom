import { Skeleton } from "../ui/skeleton";

const SimilarMaterialSkeleton = () => {
  return (
    <>
      {["", "", "", "", ""].map((skeleton, index) => (
        <div
          key={index}
          className="w-[800px] min-w-[800px] max-sm:w-[400px] max-sm:min-w-[380px] shadow rounded-xl h-56"
        >
          <Skeleton className={`h-full w-full rounded-lg ${"bg-slate-200"}`} />
        </div>
      ))}
    </>
  );
};

export default SimilarMaterialSkeleton;
