"use client";

import { cn } from "@/utils/cn";
import { motion } from "motion/react";

import { useState } from "react";
import { Drawer } from "./components/drawer";
import { menuItems } from "@/data/main-menu";
import { MenuItem } from "./components/menu/menu-item";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <motion.button
        whileTap={{
          scale: 0.97,
          transition: { ease: "easeOut", duration: 0.1 },
        }}
        onClick={() => setIsOpen(true)}
        className={cn(
          "bg-blue-500  hover:bg-blue-400",
          "px-4 py-2 text-white rounded-3xl cursor-pointer",
          "transition-colors ease-out duration-300"
        )}
      >
        Open Menu
      </motion.button>

      {isOpen ? (
        <Drawer isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <div className="flex flex-col gap-4">
            {menuItems.map((item) => (
              <MenuItem
                key={item.id}
                title={item.title}
                description={item.description}
                Icon={item.Icon}
                hasSubMenu={item.hasSubmenu ?? false}
              />
            ))}
          </div>
        </Drawer>
      ) : null}
    </div>
  );
}
