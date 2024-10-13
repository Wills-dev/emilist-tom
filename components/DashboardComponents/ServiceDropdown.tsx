import Link from "next/link";
import Image from "next/image";

import { motion } from "framer-motion";

import { useGetUserServices } from "@/hooks/useGetUserServices";

import ServiceDropdownLoader from "../Skeleton/ServiceDropdownLoader";

interface ServiceDropdownProps {
  handleServiceDropDown: () => void;
}

const ServiceDropdown = ({ handleServiceDropDown }: ServiceDropdownProps) => {
  const { services, serviceLoad } = useGetUserServices();

  return (
    <motion.div
      initial={{ y: 20 }}
      animate={{ y: 0 }}
      exit={{ y: 20 }}
      transition={{ duration: 0.3 }}
      className="absolute top-full -left-1/2 z-40 bg-white rounded-lg shadow px-4 py-6 border-1 min-w-52"
    >
      <ul className="flex flex-col gap-3 w-full ">
        {serviceLoad ? (
          <ServiceDropdownLoader />
        ) : (
          <>
            {services?.map((service: any) => (
              <li
                className="capitalize hover:text-primary-green duration-300"
                key={service?.id}
              >
                <Link
                  href={`/dashboard/service/info/${service?.id}`}
                  onClick={handleServiceDropDown}
                >
                  {service?.service}
                </Link>
              </li>
            ))}
          </>
        )}

        <li>
          <Link href="/expert/register" className="flex-c gap-1">
            <Image
              src="/assets/icons/add.svg"
              alt="logo"
              width={20}
              height={20}
              className="object-contain w-6 h-6 max-sm:w-5 max-sm:h-5"
            />{" "}
            <p className="text-primary-green  max-sm:text-sm">Add New</p>
          </Link>
        </li>
        <li className="capitalize hover:text-primary-green">
          <Link href="/dashboard/service/set-up-target"> Set target</Link>
        </li>
      </ul>
    </motion.div>
  );
};

export default ServiceDropdown;
