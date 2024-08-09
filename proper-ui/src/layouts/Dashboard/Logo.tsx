import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export const Logo = () => {
  return (
    <Link
      to={"#"}
      className="font-normal flex space-x-2 items-center text-sm text-black relative z-20"
    >
      <img
        src="RMIT_logo_red.png"
        alt="rmit-logo"
        className="h-6 w-6 inline-block scale-[180%]"
      />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium text-black dark:text-white whitespace-pre"
      >
        RMIT University
      </motion.span>
    </Link>
  );
};
