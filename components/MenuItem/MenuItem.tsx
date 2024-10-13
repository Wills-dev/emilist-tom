import Link from "next/link";

import { motion } from "framer-motion";

import { category, privateExpert, serviceList } from "@/constants";

const MenuItem = () => {
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
              <Link href="/" className="text text-light-gray">
                {category}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-col gap-4 py-4">
        <h2 className="font-bold text-lighter-gray text-lg">Services</h2>
        <ul className="flex flex-col gap-4">
          {serviceList?.map((service, index) => (
            <li key={index} className="">
              <Link href="/" className="text text-light-gray">
                {service}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-col gap-4 py-4">
        <h2 className="font-bold text-lighter-gray text-lg">Private Expert</h2>
        <ul className="flex flex-col gap-4">
          {privateExpert?.map((expert, index) => (
            <li key={index} className="">
              <Link href={expert.url} className="text text-light-gray">
                {expert.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

export default MenuItem;
