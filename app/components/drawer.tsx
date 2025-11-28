"use client";

import { cn } from "@/utils/cn";
import { AnimatePresence, motion, PanInfo } from "motion/react";
import { useEffect, useState, useRef, useCallback } from "react";
import { createPortal } from "react-dom";

interface DrawerProps {
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

export function Drawer({ isOpen, onClose, children, className }: DrawerProps) {
  const { ref, height } = useMeasure();

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

  const handleDragEnd = (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    if (info.offset.y > 100 || info.velocity.y > 500) {
      onClose();
    }
  };

  // if (!mounted) return null;

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
            className="fixed inset-0 z-50 bg-black/50 "
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
            {/* <div className="mx-auto w-12 h-1.5 bg-zinc-200 rounded-full mb-4 shrink-0" /> */}

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
