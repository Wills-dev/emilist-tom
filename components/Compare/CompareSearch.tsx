import Link from "next/link";

interface CompareSearchProps {
  title: string;
  link: string;
}

const CompareSearch = ({ link, title }: CompareSearchProps) => {
  return (
    <div className="my-4 ">
      <div className="flex-c-b bg-[#f0fdf5] border-primary-green border-1 px-[3rem] py-2 rounded-lg max-sm:flex-col max-md:px-[1rem] max-sm:px-[0.5rem]  gap-2 text-center max-sm:text-sm">
        {" "}
        <p className="text-[#303632]">
          You have selected to compare {title || ""}
        </p>{" "}
        <button className="bg-primary-green px-[18px] py-[5px] text-[#f6fdf9] rounded-[5px] cursor-pointer font-exo whitespace-nowrap">
          <Link href={link || "/"} className="whitespace-nowrap">
            Compare Now
          </Link>
        </button>
      </div>
    </div>
  );
};

export default CompareSearch;
