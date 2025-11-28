import type { LucideIcon } from "lucide-react";
import { ChevronRight } from "lucide-react";

/**
 * Props for the MenuItem component
 */
interface MenuItemProps {
  /** The primary text to display */
  title: string;
  /** Optional secondary text/description */
  description?: string;
  /** Optional icon component from lucide-react */
  Icon?: LucideIcon;
  /** Whether this item has a submenu (shows arrow) */
  hasSubMenu?: boolean;
  /** Click handler */
  onClick?: () => void;
}

export const MenuItem = ({
  title,
  description,
  Icon,
  hasSubMenu,
  onClick,
}: MenuItemProps) => {
  return (
    <button
      onClick={onClick}
      className="group flex w-full items-center justify-between p-2 hover:bg-zinc-100 focus:bg-zinc-100 rounded-xl transition-colors text-left outline-none"
    >
      <div className="flex items-start gap-3">
        {Icon && (
          <div className="py-1 text-zinc-500 group-hover:text-zinc-900 group-focus:text-zinc-900 transition-colors">
            <Icon size={20} />
          </div>
        )}
        <div className="flex flex-col">
          <h3 className="font-medium text-zinc-900">{title}</h3>
          {description && (
            <p className="text-sm text-zinc-500 group-hover:text-zinc-700 group-focus:text-zinc-700 transition-colors">
              {description}
            </p>
          )}
        </div>
      </div>
      {hasSubMenu ? (
        <ChevronRight
          size={16}
          className="text-zinc-400 group-hover:text-zinc-600 group-focus:text-zinc-600 transition-colors"
        />
      ) : null}
    </button>
  );
};
