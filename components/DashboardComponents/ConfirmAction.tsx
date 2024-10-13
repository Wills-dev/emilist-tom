import { motion } from "framer-motion";

interface ConfirmActionProps {
  closeActionModal: () => void;
  confirmAction: () => void;
  loading: boolean;
  text: string;
}

const ConfirmAction = ({
  closeActionModal,
  confirmAction,
  loading,
  text,
}: ConfirmActionProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="absolute w-full min-h-screen left-0 top-0 max-h-full h-full bg-half-transparent p-6 z-50"
    >
      <div className="flex-c justify-center h-screen min-h-screen w-full">
        <div className="bg-white rounded-lg p-6 w-96 max-w-full shadow flex-c flex-col justify-center">
          <p className="text-center max-sm:text-sm">{text}</p>
          <div className="flex-c gap-4 pt-8">
            {loading ? (
              <span className="text-primary-green loading loading-dots loading-md"></span>
            ) : (
              <>
                <button
                  className="bg-primary-green rounded-lg text-white py-2 px-3 hover:bg-green-600 transition-all duration-300"
                  onClick={confirmAction}
                >
                  Yes
                </button>
                <button
                  className="bg-red-500 rounded-lg text-white py-2 px-3 hover:bg-red-600 transition-all duration-300"
                  onClick={closeActionModal}
                >
                  No
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ConfirmAction;
