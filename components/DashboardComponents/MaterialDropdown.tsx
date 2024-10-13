import Link from "next/link";

import { motion } from "framer-motion";

interface MaterialDropdownProps {
  handleMaterialDropDown: () => void;
}

const MaterialDropdown = ({
  handleMaterialDropDown,
}: MaterialDropdownProps) => {
  return (
    <motion.div
      initial={{ y: 20 }}
      animate={{ y: 0 }}
      exit={{ y: 20 }}
      transition={{ duration: 0.3 }}
      className="absolute top-full -left-1/2 z-40 bg-white rounded-lg shadow px-4 py-6 border-1 w-52"
    >
      <ul className="flex flex-col gap-3 w-full ">
        <li className="capitalize hover:text-primary-green duration-300">
          <Link href="/dashboard/material" onClick={handleMaterialDropDown}>
            All listed materials
          </Link>
        </li>
        <li className="capitalize hover:text-primary-green duration-300">
          <Link
            href="/dashboard/material/my-listed-materials"
            onClick={handleMaterialDropDown}
          >
            My listed materials
          </Link>
        </li>

        <li className="capitalize hover:text-primary-green duration-300">
          <Link
            href="/dashboard/material/list-new-material"
            onClick={handleMaterialDropDown}
          >
            List new materials
          </Link>
        </li>

        <li className="capitalize hover:text-primary-green duration-300">
          <Link
            href="/dashboard/material/saved"
            onClick={handleMaterialDropDown}
          >
            Saved materials
          </Link>
        </li>
      </ul>
    </motion.div>
  );
};

export default MaterialDropdown;
