import { LucideIcon } from "lucide-react";

interface MenuItemProps {
  title: string;
  description: string;
  Icon: LucideIcon;
}

export const MenuItem = ({ title, description, Icon }: MenuItemProps) => {
  return (
    <div className="flex items-start gap-3">
      <div className="py-1">
        <Icon />
      </div>
      <div className="flex flex-col">
        <h3>{title}</h3>
        <p className="text-sm text-zinc-400">{description}</p>
      </div>
    </div>
  );
};
