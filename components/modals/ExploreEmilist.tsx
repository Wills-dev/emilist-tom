import Link from "next/link";

import { Modal } from "antd";
import { AnimatePresence, motion } from "framer-motion";

import { category, serviceList } from "@/constants";
import { fadeIn } from "@/anim";
import { useRouter } from "next/navigation";

interface ExploreEmilistProps {
  isOpen: boolean;
  onCancel: () => void;
}

const ExploreEmilist = ({ isOpen, onCancel }: ExploreEmilistProps) => {
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
    <Modal open={isOpen} centered onCancel={onCancel} width={900} footer={null}>
      {" "}
      <AnimatePresence>
        <motion.div
          initial={{ x: 100 }}
          animate={{ x: 0 }}
          exit={{ x: 100 }}
          transition={{ duration: 0.4 }}
          className="w-full bg-white h-full p-6"
        >
          <div className="flex flex-col gap-4 py-4">
            <h2 className="font-semibold text-lg w-full border-b-1 border-gray-400 pb-2">
              Industry
            </h2>
            <ul className="flex-c flex-wrap">
              {category?.map((category, index) => (
                <motion.li
                  variants={fadeIn("right", "spring", index * 0.5, 0.75)}
                  initial="hidden"
                  animate="show"
                  key={index}
                  className="xl:w-1/4 lg:w-1/3 w-1/2 py-2"
                >
                  <p
                    onClick={() => handleSearch(category, "job")}
                    className="hover:text-primary-green transition-all duration-300 capitalize cursor-pointer"
                  >
                    {category}
                  </p>
                </motion.li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-4 py-4">
            <h2 className="font-semibold text-lg w-full border-b-1 border-gray-400 pb-2">
              Services
            </h2>
            <ul className="flex-c flex-wrap gap-4">
              {serviceList?.map((service, index) => (
                <li key={index} className="xl:w-1/4 lg:w-1/3 w-1/2 py-2">
                  <p
                    onClick={() => handleSearch(service, "service")}
                    className="hover:text-primary-green transition-all duration-300 capitalize cursor-pointer"
                  >
                    {service}
                  </p>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-4 py-4">
            <h2 className="font-semibold text-lg w-full border-b-1 border-gray-400 pb-2">
              Private Expert
            </h2>
            <ul className="flex flex-col gap-4">
              <li className="">
                <Link
                  href="/expert/private-expert"
                  className="hover:text-primary-green transition-all duration-300 capitalize"
                >
                  Private expert
                </Link>
              </li>
            </ul>
          </div>
        </motion.div>
      </AnimatePresence>
    </Modal>
  );
};

export default ExploreEmilist;
