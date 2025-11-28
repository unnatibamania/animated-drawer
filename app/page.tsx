"use client";

import { cn } from "@/utils/cn";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { Drawer } from "./components/drawer";
import { menuItems, MenuItemProps } from "@/data/main-menu";
import { MenuItem } from "./components/menu/menu-item";
import { ChevronLeft } from "lucide-react";

interface MenuLevel {
  id: string;
  title: string;
  items: MenuItemProps[];
}

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [menuStack, setMenuStack] = useState<MenuLevel[]>([
    { id: "root", title: "Menu", items: menuItems },
  ]);
  const [direction, setDirection] = useState(0);

  const currentMenu = menuStack[menuStack.length - 1];

  const handlePush = (item: MenuItemProps) => {
    if (item.items) {
      setDirection(1);
      setMenuStack((prev) => [
        ...prev,
        { id: item.id, title: item.title, items: item.items! },
      ]);
    }
  };

  const handlePop = () => {
    setDirection(-1);
    setMenuStack((prev) => {
      if (prev.length > 1) {
        return prev.slice(0, -1);
      }
      return prev;
    });
  };

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(() => {
      setMenuStack([{ id: "root", title: "Menu", items: menuItems }]);
      setDirection(0);
    }, 300);
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 100 : -100,
      opacity: 0,
    }),
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-zinc-50">
      <motion.button
        whileTap={{
          scale: 0.97,
          transition: { ease: "easeOut", duration: 0.1 },
        }}
        onClick={() => setIsOpen(true)}
        className={cn(
          "bg-blue-500 hover:bg-blue-400",
          "px-6 py-3 text-white rounded-full cursor-pointer",
          "transition-colors ease-out duration-300 font-medium shadow-lg shadow-zinc-900/20"
        )}
      >
        Open Menu
      </motion.button>

      <Drawer isOpen={isOpen} onClose={handleClose}>
        <div className="flex flex-col gap-4">
          <AnimatePresence mode="popLayout" initial={false}>
            {menuStack.length > 1 && (
              <motion.button
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                onClick={handlePop}
                className="flex items-center gap-1 text-sm font-medium text-zinc-500 hover:text-zinc-900 transition-colors"
              >
                <ChevronLeft size={18} />
                Back
              </motion.button>
            )}
          </AnimatePresence>

          <div className="relative overflow-hidden">
            <AnimatePresence
              mode="popLayout"
              initial={false}
              custom={direction}
            >
              <motion.div
                key={currentMenu.id}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: "spring", bounce: 0, duration: 0.4 }}
                className="flex flex-col gap-1 w-full"
              >
                {currentMenu.items.map((item) => (
                  <MenuItem
                    key={item.id}
                    title={item.title}
                    description={item.description}
                    Icon={item.Icon}
                    hasSubMenu={!!item.items}
                    onClick={() => (item.items ? handlePush(item) : undefined)}
                  />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </Drawer>
    </div>
  );
}
