import { LucideIcon } from "lucide-react";

import { ChevronRight } from "lucide-react";

interface MenuItemProps {
  title: string;
  description: string;
  Icon: LucideIcon;
  hasSubMenu: boolean;
}

export const MenuItem = ({
  title,
  description,
  Icon,
  hasSubMenu,
}: MenuItemProps) => {
  return (
    <section className="flex justify-between">
      <div className="flex items-start gap-3">
        <div className="py-1">
          <Icon />
        </div>
        <div className="flex flex-col">
          <h3>{title}</h3>
          <p className="text-sm text-zinc-400">{description}</p>
        </div>
      </div>
      {hasSubMenu ? <ChevronRight size={16} /> : null}
    </section>
  );
};
