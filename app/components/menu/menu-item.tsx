import type { LucideIcon } from "lucide-react";
import { ChevronRight } from "lucide-react";

interface MenuItemProps {
  title: string;
  description?: string;
  Icon?: LucideIcon;
  hasSubMenu?: boolean;
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
      className="flex w-full items-center justify-between p-2 hover:bg-zinc-100 rounded-xl transition-colors text-left"
    >
      <div className="flex items-start gap-3">
        {Icon && (
          <div className="py-1 text-zinc-500">
            <Icon size={20} />
          </div>
        )}
        <div className="flex flex-col">
          <h3 className="font-medium text-zinc-900">{title}</h3>
          {description && (
            <p className="text-sm text-zinc-500">{description}</p>
          )}
        </div>
      </div>
      {hasSubMenu ? <ChevronRight size={16} className="text-zinc-400" /> : null}
    </button>
  );
};
