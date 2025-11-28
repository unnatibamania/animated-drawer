"use client";

import { cn } from "@/utils/cn";
import { motion } from "motion/react";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <motion.button
        whileTap={{
          scale: 0.97,
          transition: { ease: "easeOut", duration: 0.1 },
        }}
        className={cn(
          "bg-blue-500  hover:bg-blue-400 ",
          "px-4 py-2 rounded-3xl cursor-pointer",
          "transition-colors ease-out duration-300"
        )}
      >
        Open Menu
      </motion.button>
    </div>
  );
}
