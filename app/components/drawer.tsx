"use client";

import { cn } from "@/utils/cn";
import { AnimatePresence, motion, PanInfo } from "motion/react";
import { useEffect, useState, useRef, useCallback, useId } from "react";
import { createPortal } from "react-dom";
import { ChevronLeft, LucideIcon } from "lucide-react";
import { MenuItem } from "./menu/menu-item";

interface DrawerPrimitiveProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
  titleId?: string;
  descriptionId?: string;
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
  titleId,
  descriptionId,
}: DrawerPrimitiveProps) {
  const { ref: measureRef, height } = useMeasure();
  const drawerRef = useRef<HTMLDivElement>(null);
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

  // Focus Trap and Keyboard Navigation
  useEffect(() => {
    if (isOpen) {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          onClose();
        }

        if (e.key === "Tab") {
          const focusableElements = drawerRef.current?.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          );

          if (!focusableElements || focusableElements.length === 0) return;

          const firstElement = focusableElements[0] as HTMLElement;
          const lastElement = focusableElements[
            focusableElements.length - 1
          ] as HTMLElement;

          if (e.shiftKey) {
            if (document.activeElement === firstElement) {
              e.preventDefault();
              lastElement.focus();
            }
          } else {
            if (document.activeElement === lastElement) {
              e.preventDefault();
              firstElement.focus();
            }
          }
        }

        if (e.key === "ArrowDown" || e.key === "ArrowUp") {
          e.preventDefault(); // Prevent scrolling
          const focusableElements = Array.from(
            drawerRef.current?.querySelectorAll(
              'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            ) || []
          ) as HTMLElement[];

          if (focusableElements.length === 0) return;

          const currentIndex = focusableElements.indexOf(
            document.activeElement as HTMLElement
          );
          let nextIndex;

          if (e.key === "ArrowDown") {
            nextIndex = (currentIndex + 1) % focusableElements.length;
          } else {
            nextIndex =
              (currentIndex - 1 + focusableElements.length) %
              focusableElements.length;
          }

          focusableElements[nextIndex].focus();
        }
      };

      window.addEventListener("keydown", handleKeyDown);

      // Initial focus management
      const timer = setTimeout(() => {
        const focusableElements = drawerRef.current?.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements && focusableElements.length > 0) {
          (focusableElements[0] as HTMLElement).focus();
        } else {
          drawerRef.current?.focus();
        }
      }, 50);

      return () => {
        window.removeEventListener("keydown", handleKeyDown);
        clearTimeout(timer);
      };
    }
  }, [isOpen, onClose]);

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
            aria-hidden="true"
          />

          {/* Drawer Panel */}
          <motion.div
            ref={drawerRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={descriptionId}
            tabIndex={-1}
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
              "p-4 shadow-xl outline-none",
              "max-h-[90vh] overflow-hidden flex flex-col",
              className
            )}
          >
            <motion.div
              animate={{ height }}
              transition={{ type: "spring", bounce: 0, duration: 0.4 }}
              className="overflow-hidden"
            >
              <div
                ref={measureRef}
                className="overflow-y-auto custom-scrollbar"
              >
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

/**
 * Represents a navigation link item in the drawer
 */
export interface DrawerLink {
  /** Unique identifier for the link */
  id: string;
  /** Display title of the link */
  title: string;
  /** Optional description text */
  description?: string;
  /** Optional icon component */
  Icon?: LucideIcon;
  /** Optional nested items for submenus */
  items?: DrawerLink[];
}

/**
 * Props for the Drawer component
 */
export interface DrawerProps {
  /** Text to display on the trigger button */
  buttonText?: string;
  /** Class name for the trigger button */
  className?: string;
  /** Class name for the drawer panel */
  drawerClassName?: string;
  /** Array of navigation links to display */
  links?: DrawerLink[];
  /** Custom content to display above links */
  children?: React.ReactNode;
  /** Title for the drawer header */
  title?: string;
}

interface MenuLevel {
  id: string;
  title: string;
  items: DrawerLink[];
}

/**
 * A reusable, accessible drawer component with nested navigation support.
 * Handles focus management, keyboard navigation, and screen reader support.
 *
 * @example
 * ```tsx
 * <Drawer
 *   buttonText="Open Menu"
 *   title="Main Menu"
 *   links={[
 *     { id: 'home', title: 'Home', Icon: HomeIcon }
 *   ]}
 * />
 * ```
 */
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
  const triggerRef = useRef<HTMLButtonElement>(null);

  // IDs for accessibility
  const titleId = useId();
  const descriptionId = useId();

  // Reset stack if links or title change
  useEffect(() => {
    if (links.length > 0) {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      setMenuStack([{ id: "root", title: title || "Menu", items: links }]);
    }
  }, [links, title]);

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
    // Restore focus to trigger button
    triggerRef.current?.focus();

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
        ref={triggerRef}
        whileTap={{ scale: 0.97 }}
        onClick={() => setIsOpen(true)}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        className={cn(
          "bg-blue-500 hover:bg-blue-400",
          "px-6 py-3 text-white rounded-full cursor-pointer",
          "transition-colors ease-out duration-300 font-medium shadow-lg shadow-zinc-900/20",
          "outline-none",
          className
        )}
      >
        {buttonText}
      </motion.button>

      <DrawerPrimitive
        isOpen={isOpen}
        onClose={handleClose}
        className={drawerClassName}
        titleId={titleId}
        descriptionId={descriptionId}
      >
        <div className="flex overflow-hidden flex-col gap-4">
          {/* Accessible Title (Visually hidden or part of UI) */}
          {/* We render a visible title if provided, acting as the label */}
          {title && (
            <h2
              id={titleId}
              className="text-lg font-semibold text-zinc-900 px-2"
            >
              {menuStack.length > 1 ? currentMenu.title : title}
            </h2>
          )}

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
                    aria-label="Go back to previous menu"
                    className="flex items-center gap-1 text-sm font-medium text-zinc-500 hover:text-zinc-900 transition-colors mb-2 px-2 outline-none rounded-lg w-fit"
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
