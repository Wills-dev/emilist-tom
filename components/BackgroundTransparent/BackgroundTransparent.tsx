import { motion } from "framer-motion";

const BackgroundTransparent = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.1 } }}
      exit={{ opacity: 0, transition: { duration: 0.4 } }}
      className="absolute w-full h-full min-h-screen bg-[rgba(0,0,0,0.2)] z-20  xl:block hidden"
    />
  );
};

export default BackgroundTransparent;
