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
  Code,
  Database,
  Cloud,
  Cpu,
  Globe,
  Shield,
  Zap,
  Users,
} from "lucide-react";

export type MenuItemProps = {
  id: string;
  title: string;
  description?: string;
  Icon?: LucideIcon;
  items?: MenuItemProps[];
};

export const menuItems: MenuItemProps[] = [
  {
    id: "home",
    title: "Home",
    description: "Welcome to our comprehensive platform",
    Icon: Home,
  },
  {
    id: "products-services",
    title: "Products & Services",
    description: "Explore our comprehensive offerings",
    Icon: Package,
    items: [
      {
        id: "cloud-solutions",
        title: "Cloud Solutions",
        description: "Scalable cloud infrastructure",
        Icon: Cloud,
        items: [
          {
            id: "aws-services",
            title: "AWS Services",
            description: "Amazon Web Services integration",
            Icon: Database,
          },
          {
            id: "azure-services",
            title: "Azure Services",
            description: "Microsoft Azure solutions",
            Icon: Globe,
          },
        ],
      },
      {
        id: "app-development",
        title: "App Development",
        description: "Custom software development",
        Icon: Code,
      },
      {
        id: "cyber-security",
        title: "Cyber Security",
        description: "Protect your digital assets",
        Icon: Shield,
      },
    ],
  },
  {
    id: "industry-solutions",
    title: "Industry Solutions",
    description: "Specialized solutions for different industries",
    Icon: Layers3,
    items: [
      {
        id: "fintech",
        title: "FinTech",
        description: "Financial technology solutions",
        Icon: LineChart,
      },
      {
        id: "healthcare",
        title: "Healthcare",
        description: "Digital health platforms",
        Icon: TestTubeDiagonal,
      },
      {
        id: "retail",
        title: "Retail",
        description: "E-commerce and POS systems",
        Icon: Package,
      },
    ],
  },
  {
    id: "company",
    title: "Company",
    description: "Learn about our organization and culture",
    Icon: Building2,
    items: [
      {
        id: "about-us",
        title: "About Us",
        description: "Our story and mission",
        Icon: Users,
      },
      {
        id: "careers",
        title: "Careers",
        description: "Join our growing team",
        Icon: Zap,
      },
      {
        id: "leadership",
        title: "Leadership",
        description: "Meet our executive team",
        Icon: Users,
      },
    ],
  },
  {
    id: "resources",
    title: "Resources",
    description: "Knowledge base, tools, and learning materials",
    Icon: BookOpen,
    items: [
      {
        id: "blog",
        title: "Blog",
        description: "Latest news and insights",
        Icon: BookOpen,
      },
      {
        id: "case-studies",
        title: "Case Studies",
        description: "Success stories from our clients",
        Icon: LineChart,
      },
    ],
  },
  {
    id: "support",
    title: "Support",
    description: "Get help and support when you need it",
    Icon: Headset,
    items: [
      {
        id: "help-center",
        title: "Help Center",
        description: "Guides and FAQs",
        Icon: BookOpen,
      },
      {
        id: "contact-support",
        title: "Contact Support",
        description: "Reach out to our support team",
        Icon: Headset,
      },
    ],
  },
  {
    id: "research-innovation",
    title: "Research & Innovation",
    description: "Cutting-edge research and innovation initiatives",
    Icon: TestTubeDiagonal,
    items: [
      {
        id: "ai-lab",
        title: "AI Lab",
        description: "Artificial Intelligence research",
        Icon: Cpu,
      },
      {
        id: "blockchain",
        title: "Blockchain",
        description: "Decentralized technologies",
        Icon: Database,
      },
    ],
  },
  {
    id: "sustainability",
    title: "Sustainability",
    description: "Environmental responsibility and sustainable technology",
    Icon: Leaf,
    items: [
      {
        id: "green-tech",
        title: "Green Tech",
        description: "Eco-friendly technology solutions",
        Icon: Leaf,
      },
      {
        id: "carbon-footprint",
        title: "Carbon Footprint",
        description: "Tracking and reducing emissions",
        Icon: LineChart,
      },
    ],
  },
  {
    id: "investor-relations",
    title: "Investor Relations",
    description: "Financial information and investor resources",
    Icon: LineChart,
    items: [
      {
        id: "financial-reports",
        title: "Financial Reports",
        description: "Quarterly and annual reports",
        Icon: LineChart,
      },
      {
        id: "stock-info",
        title: "Stock Information",
        description: "Real-time stock data",
        Icon: LineChart,
      },
    ],
  },
  {
    id: "contact",
    title: "Contact",
    description: "Get in touch with our team",
    Icon: Phone,
  },
];
