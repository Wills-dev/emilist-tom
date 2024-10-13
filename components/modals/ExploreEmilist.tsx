import Link from "next/link";

import { Modal } from "antd";
import { AnimatePresence, motion } from "framer-motion";

import { category, privateExpert, serviceList } from "@/constants";
import { fadeIn } from "@/anim";

interface ExploreEmilistProps {
  isOpen: boolean;
  onCancel: () => void;
}

const ExploreEmilist = ({ isOpen, onCancel }: ExploreEmilistProps) => {
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
                  <Link
                    href="/"
                    className="hover:text-primary-green transition-all duration-300 capitalize"
                  >
                    {category}
                  </Link>
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
                  <Link
                    href="/"
                    className="hover:text-primary-green transition-all duration-300 capitalize"
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-4 py-4">
            <h2 className="font-semibold text-lg w-full border-b-1 border-gray-400 pb-2">
              Private Expert
            </h2>
            <ul className="flex flex-col gap-4">
              {privateExpert?.map((expert, index) => (
                <li key={index} className="">
                  <Link
                    href={expert.url}
                    className="hover:text-primary-green transition-all duration-300 capitalize"
                  >
                    {expert.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </AnimatePresence>
    </Modal>
  );
};

export default ExploreEmilist;
