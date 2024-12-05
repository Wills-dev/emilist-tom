import { motion } from "framer-motion";

import { DataTable } from "../DashboardComponents/DataTable";
import { Column } from "./Column";
import { allData } from "@/constants/dummy";

const WalletHistory = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 100, transition: { duration: 0.2 } }}
      transition={{
        duration: 0.4,
        ease: [0.61, 1, 0.88, 1],
      }}
    >
      <div className="w-full py-10">
        <DataTable columns={Column} data={allData} searchValue="" />
      </div>
    </motion.div>
  );
};

export default WalletHistory;
