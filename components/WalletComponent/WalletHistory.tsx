import { motion } from "framer-motion";

import { DataTable } from "../DashboardComponents/DataTable";
import { Column } from "./Column";

interface WalletHistoryProps {
  loading: boolean;
  transactions: any;
  totalPages: number;
  handlePageChange: (page: number) => void;
  setLimit: (limit: number) => void;
}

const WalletHistory = ({
  loading,
  transactions,
  totalPages,
  handlePageChange,
  setLimit,
}: WalletHistoryProps) => {
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
        <DataTable columns={Column} data={transactions} searchValue="" />
      </div>
    </motion.div>
  );
};

export default WalletHistory;
