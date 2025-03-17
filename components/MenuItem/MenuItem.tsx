import Link from "next/link";
import { useRouter } from "next/navigation";

import { motion } from "framer-motion";
import { category, serviceList } from "@/constants";

const MenuItem = () => {
  const router = useRouter();

  const handleSearch = (service: string, type: string) => {
    // Build the query string dynamically
    const query = new URLSearchParams({
      ...(service && { q: service.trim() }),
    }).toString();
    if (type === "service") {
      router.push(`/catalog/services?${query}`);
    } else {
      router.push(`/find-job?${query}`);
    }
  };

  return (
    <motion.div
      initial={{ y: 20 }}
      animate={{ y: 0 }}
      exit={{ y: 20 }}
      transition={{ duration: 0.3 }}
      className="absolute top-10 left-0 right-0 w-full h-[85vh] overflow-y-auto bg-part-transparent  padding-x backdrop-blur"
    >
      <div className="flex flex-col gap-4 py-4">
        <h2 className="font-bold text-lighter-gray text-lg">Industry</h2>
        <ul className="flex flex-col gap-4">
          {category?.map((category, index) => (
            <li key={index} className="">
              <span
                className="text text-light-gray"
                onClick={() => handleSearch(category, "job")}
              >
                {category}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-col gap-4 py-4">
        <h2 className="font-bold text-lighter-gray text-lg">Services</h2>
        <ul className="flex flex-col gap-4">
          {serviceList?.map((service, index) => (
            <li key={index} className="">
              <span
                className="text text-light-gray"
                onClick={() => handleSearch(service, "service")}
              >
                {service}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-col gap-4 py-4">
        <h2 className="font-bold text-lighter-gray text-lg">Private Expert</h2>
        <ul className="flex flex-col gap-4">
          <li className="">
            <Link
              href="/expert/private-expert"
              className="text text-light-gray"
            >
              Private expert
            </Link>
          </li>
        </ul>
      </div>
    </motion.div>
  );
};

export default MenuItem;
