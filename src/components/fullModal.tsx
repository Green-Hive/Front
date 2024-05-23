import { AnimatePresence, HTMLMotionProps, motion } from "framer-motion";
import Backdrop from "./backdrop";
import { Edit } from "iconoir-react";

export function FullModalHeader({
  title,
  onClose,
}: {
  title: string;
  onClose: () => void;
}) {
  return (
    <div className="padding border-b flex justify-between sticky top-0 left-0 bg-surface-100 z-20">
      <h1>{title}</h1>
      <Edit className="w-7 h-7 stroke-2 cursor-pointer" onClick={onClose} />
    </div>
  );
}

export default function FullModal({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <AnimatePresence>
      <div className="flex fixed top-0 right-0 z-50 h-screen w-screen">
        <Backdrop />

        <motion.div
          initial={{ opacity: 0, x: 200 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2, type: "spring" }}
          className={
            "absolute right-0 top-0 w-1/2 h-full bg-Light-gray dark:bg-[#E5E5E5] rounded-l flex flex-col overflow-auto"          }
        >
          {children}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
