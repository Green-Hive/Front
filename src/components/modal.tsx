import { ReactNode } from "react";
import Backdrop from "./backdrop";
import { AnimatePresence, motion } from "framer-motion";

export default function Modal({
  children,
}: {
  children?: ReactNode;
}) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed top-0 left-0 z-50 flex justify-center items-center w-full h-full"
      >
        <Backdrop />
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          transition={{ ease: "easeOut", duration: 0.08 }}
          className={
            "bg-Light-gray dark:bg-[#E5E5E5] md:w-[40%] max-w-[35%] padding rounded absolute max-h-[85%] "
          }
        >
          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
