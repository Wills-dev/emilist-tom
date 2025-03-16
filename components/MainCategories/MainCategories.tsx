import Image from "next/image";
import Link from "next/link";

import { mainCategoriesLinks } from "@/constants";

const MainCategories = () => {
  return (
    <section className="py-8 padding-ctn">
      <div className="flex-c justify-center">
        <div className="flex gap-4 overflow-x-auto hide-scrollbar">
          {mainCategoriesLinks?.map((data) => (
            <Link
              key={data?.id}
              href={data?.link}
              className="max-w-48 w-48 min-w-48 border-1 border-gray-300 rounded-lg p-4 flex-c flex-col justify-center gap-4 hover:bg-gray-100 transition-all duration-300"
            >
              <div className="">
                <Image
                  src={data?.icon}
                  width={20}
                  height={20}
                  alt={data?.name}
                  className="w-8 h-8 object-contain"
                />
              </div>
              <p className="text-center font-semibold text-lg">{data?.name}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MainCategories;
