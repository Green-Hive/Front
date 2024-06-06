import {
  createContext,
  createRef,
  useContext,
  useEffect,
  useState,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, WarningCircle, WarningTriangle } from "iconoir-react";

interface SnackbarType {
  type: "success" | "error" | "warning" | "info";
  message: string;
  extra?: string;
}

function Item({
  snackbar,
}: {
  snackbar: SnackbarType & { ref: React.RefObject<HTMLDivElement> };
}) {
  return (
    <motion.div
      layout
      initial={{ x: 350 }}
      animate={{ x: 0 }}
      exit={{ x: 350 }}
      transition={{
        type: "spring",
        stiffness: 1000,
        duration: 100,
        damping: 40,
      }}
      className={`py-2 px-3 rounded w-[300px] flex gap-3 items-center
      ${snackbar.type === "success" && "bg-green-600 text-white fill-white"}  
      ${snackbar.type === "error" && "bg-red-500 text-white fill-white"}  
      ${snackbar.type === "warning" && "bg-orange-500 text-white fill-white"}  
      ${snackbar.type === "info" && "bg-blue-500 text-white fill-white"}  
      `}
    >
      {snackbar.type === "success" && <CheckCircle className="w-5" />}
      {snackbar.type === "error" && <WarningCircle className="w-5" />}
      {snackbar.type === "warning" && <WarningTriangle className="w-5" />}
      {snackbar.type === "info" && <WarningCircle className="w-5" />}
      {snackbar.message}
    </motion.div>
  );
}

const snackbarsContext = createContext<{
  pushSnackbar: (snackbar: SnackbarType) => void;
}>({
  pushSnackbar: () => {},
});

export default function SnackbarsContext({
  children,
}: {
  children: React.ReactNode;
}) {
  const [snackbars, setSnackbars] = useState<
    (SnackbarType & { ref: React.RefObject<HTMLDivElement> })[]
  >([]);

  const pushSnackbar = (snackbar: SnackbarType) => {
    setSnackbars([
      ...snackbars,
      { ...snackbar, ref: createRef<HTMLDivElement>() },
    ]);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSnackbars(snackbars.slice(1));
    }, 3000);

    if (!snackbars.length) clearTimeout(timeout);
    return () => {
      clearTimeout(timeout);
    };
  }, [snackbars]);

  return (
    <snackbarsContext.Provider value={{ pushSnackbar }}>
      <div className="full overflow-hidden">
        {children}
        <div className="fixed bottom-10 right-10 flex flex-col gap-5 z-50">
          <AnimatePresence>
            {snackbars.map((snackbar, index) => (
              <Item snackbar={snackbar} key={index} />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </snackbarsContext.Provider>
  );
}

export const useSnackbarsContext = () => useContext(snackbarsContext);
