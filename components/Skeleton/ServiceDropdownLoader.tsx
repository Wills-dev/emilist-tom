import { Skeleton } from "../ui/skeleton";

const ServiceDropdownLoader = () => {
  return (
    <>
      {" "}
      <Skeleton className="h-6 w-full bg-slate-200" />
      <Skeleton className="h-6 w-full bg-slate-200" />
    </>
  );
};

export default ServiceDropdownLoader;
