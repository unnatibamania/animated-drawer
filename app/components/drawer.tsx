"use client";

import { cn } from "@/utils/cn";
import { AnimatePresence, motion, PanInfo } from "motion/react";
import { useEffect, useState, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import { ChevronLeft, LucideIcon } from "lucide-react";
import { MenuItem } from "./menu/menu-item";

interface DrawerPrimitiveProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}

const useMeasure = () => {
  const [height, setHeight] = useState<number | "auto">("auto");
  const observerRef = useRef<ResizeObserver | null>(null);

  const ref = useCallback((node: HTMLDivElement | null) => {
    if (observerRef.current) {
      observerRef.current.disconnect();
      observerRef.current = null;
    }

    if (node) {
      const observer = new ResizeObserver((entries) => {
        for (const entry of entries) {
          const contentHeight = entry.borderBoxSize[0].blockSize;
          setHeight(contentHeight);
        }
      });

      observer.observe(node);
      observerRef.current = observer;
    }
  }, []);

  return { ref, height };
};

function DrawerPrimitive({
  isOpen,
  onClose,
  children,
  className,
}: DrawerPrimitiveProps) {
  const { ref, height } = useMeasure();

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  const handleDragEnd = (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    if (info.offset.y > 100 || info.velocity.y > 500) {
      onClose();
    }
  };

  if (!isMounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/50"
          />

          {/* Drawer Panel */}
          <motion.div
            layout
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", duration: 0.3, bounce: 0.1 }}
            drag="y"
            dragConstraints={{ top: 0 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
            className={cn(
              "fixed bottom-2 left-2 right-2 z-50",
              "bg-white rounded-3xl",
              "p-4 shadow-xl",
              "max-h-[90vh] overflow-hidden flex flex-col",
              className
            )}
          >
            <motion.div
              animate={{ height }}
              transition={{ type: "spring", bounce: 0, duration: 0.4 }}
              className="overflow-hidden"
            >
              <div ref={ref} className="overflow-y-auto custom-scrollbar">
                {children}
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}

// Public Interface

export interface DrawerLink {
  id: string;
  title: string;
  description?: string;
  Icon?: LucideIcon;
  items?: DrawerLink[];
}

export interface DrawerProps {
  buttonText?: string;
  className?: string; // For the trigger button
  drawerClassName?: string; // For the drawer panel
  links?: DrawerLink[];
  children?: React.ReactNode;
  title?: string; // Optional overall title for the drawer header if needed
}

interface MenuLevel {
  id: string;
  title: string;
  items: DrawerLink[];
}

export function Drawer({
  buttonText = "Open",
  className,
  drawerClassName,
  links = [],
  children,
  title,
}: DrawerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [menuStack, setMenuStack] = useState<MenuLevel[]>(() =>
    links.length > 0
      ? [{ id: "root", title: title || "Menu", items: links }]
      : []
  );
  const [direction, setDirection] = useState(0);

  // Note: If 'links' prop changes dynamically, the parent component should
  // use a 'key' prop on the Drawer to force a re-mount and reset the state.
  // e.g. <Drawer key={someId} links={...} />

  const currentMenu = menuStack[menuStack.length - 1];

  const handlePush = (item: DrawerLink) => {
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
    // Reset stack after animation
    setTimeout(() => {
      setMenuStack([{ id: "root", title: title || "Menu", items: links }]);
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
    <>
      <motion.button
        whileTap={{ scale: 0.97 }}
        onClick={() => setIsOpen(true)}
        className={cn(
          "bg-blue-500 hover:bg-blue-400",
          "px-6 py-3 text-white rounded-full cursor-pointer",
          "transition-colors ease-out duration-300 font-medium shadow-lg shadow-zinc-900/20",
          className
        )}
      >
        {buttonText}
      </motion.button>

      <DrawerPrimitive
        isOpen={isOpen}
        onClose={handleClose}
        className={drawerClassName}
      >
        <div className="flex overflow-hidden flex-col gap-4">
          {children}

          {links.length > 0 && currentMenu && (
            <>
              <AnimatePresence mode="popLayout" initial={false}>
                {menuStack.length > 1 && (
                  <motion.button
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    onClick={handlePop}
                    className="flex items-center gap-1 text-sm font-medium text-zinc-500 hover:text-zinc-900 transition-colors mb-2"
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
                        onClick={() =>
                          item.items ? handlePush(item) : undefined
                        }
                      />
                    ))}
                  </motion.div>
                </AnimatePresence>
              </div>
            </>
          )}
        </div>
      </DrawerPrimitive>
    </>
  );
}
