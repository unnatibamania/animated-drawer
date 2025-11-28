import type { LucideIcon } from "lucide-react";
import {
  BookOpen,
  Building2,
  Headset,
  Home,
  Leaf,
  LineChart,
  Package,
  Phone,
  TestTubeDiagonal,
  Layers3,
} from "lucide-react";

type MenuItemProps = {
  id: string;
  title: string;
  description: string;
  hasSubmenu?: boolean;
  Icon: LucideIcon;
};

export const menuItems: MenuItemProps[] = [
  {
    Icon: Home,
    id: "home",
    title: "Home",
    description: "Welcome to our comprehensive platform",
  },
  {
    Icon: Package,
    id: "products-services",
    title: "Products & Services",
    description: "Explore our comprehensive offerings",
    hasSubmenu: true,
  },
  {
    Icon: Layers3,
    id: "industry-solutions",
    title: "Industry Solutions",
    description: "Specialized solutions for different industries",
    hasSubmenu: true,
  },
  {
    Icon: Building2,
    id: "company",
    title: "Company",
    description: "Learn about our organization and culture",
    hasSubmenu: true,
  },
  {
    Icon: BookOpen,
    id: "resources",
    title: "Resources",
    description: "Knowledge base, tools, and learning materials",
    hasSubmenu: true,
  },
  {
    Icon: Headset,
    id: "support",
    title: "Support",
    description: "Get help and support when you need it",
    hasSubmenu: true,
  },
  {
    Icon: TestTubeDiagonal,
    id: "research-innovation",
    title: "Research & Innovation",
    description: "Cutting-edge research and innovation initiatives",
    hasSubmenu: true,
  },
  {
    Icon: Leaf,
    id: "sustainability",
    title: "Sustainability",
    description: "Environmental responsibility and sustainable technology",
    hasSubmenu: true,
  },
  {
    Icon: LineChart,
    id: "investor-relations",
    title: "Investor Relations",
    description: "Financial information and investor resources",
    hasSubmenu: true,
  },
  {
    Icon: Phone,
    id: "contact",
    title: "Contact",
    description: "Get in touch with our team",
  },
];
