import { motion } from "framer-motion";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

export default function Check({ onClick }: { onClick?: () => void }) {
  const [clicked, setClicked] = useState(false);

  const handleOnClick = () => {
    setClicked(true);
    if(onClick) onClick()
  };

  return !clicked ? (
    <CheckCircleIcon
      onClick={() => handleOnClick()}
      className={`text-c-gray-200 cursor-pointer h-8 w-8`}
    />
  ) : (
    <motion.div
      key="finished"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.5,
        ease: [0, 0.71, 0.2, 1.01],
      }}
    >
      <CheckCircleIcon className={` text-success  h-8 w-8`} />
    </motion.div>
  );
}
