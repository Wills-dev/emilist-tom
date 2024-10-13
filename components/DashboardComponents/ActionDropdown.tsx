import Link from "next/link";

import { motion } from "framer-motion";

interface ActionDropdownProps {
  confirmDelete: () => void;
  link: string;
}

const ActionDropdown = ({ confirmDelete, link }: ActionDropdownProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="p-6 min-w-fit absolute right-0 top-full z-10 bg-white rounded-lg shadow flex flex-col gap-3 items-start"
    >
      <Link
        href={link}
        className="max-sm:text-sm hover:text-primary-green transition-all duration-300"
      >
        Edit
      </Link>
      <button className="max-sm:text-sm text-red-500" onClick={confirmDelete}>
        Delete
      </button>
    </motion.div>
  );
};

export default ActionDropdown;
