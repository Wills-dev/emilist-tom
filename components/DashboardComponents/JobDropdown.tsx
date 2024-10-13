import Link from "next/link";

import { motion } from "framer-motion";

interface JobDropdownProps {
  handleJobDropDown: () => void;
}

const JobDropdown = ({ handleJobDropDown }: JobDropdownProps) => {
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
          <Link href="/dashboard/job/new" onClick={handleJobDropDown}>
            my jobs
          </Link>
        </li>
        <li className="capitalize hover:text-primary-green duration-300">
          <Link href="/dashboard/job/list-new-job" onClick={handleJobDropDown}>
            List new jobs
          </Link>
        </li>
        <li className="capitalize hover:text-primary-green duration-300">
          <Link href="/dashboard/job" onClick={handleJobDropDown}>
            All listed jobs
          </Link>
        </li>

        <li className="capitalize hover:text-primary-green duration-300">
          <Link
            href="/dashboard/job/my-listed-jobs"
            onClick={handleJobDropDown}
          >
            my listed jobs
          </Link>
        </li>

        <li className="capitalize hover:text-primary-green duration-300">
          <Link href="/dashboard/job/application" onClick={handleJobDropDown}>
            applications
          </Link>
        </li>
        <li className="capitalize hover:text-primary-green duration-300">
          <Link href="/dashboard/job/saved" onClick={handleJobDropDown}>
            Saved jobs
          </Link>
        </li>
      </ul>
    </motion.div>
  );
};

export default JobDropdown;
