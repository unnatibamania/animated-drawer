"use client";

import { Drawer } from "./components/drawer";
import { menuItems } from "@/data/main-menu";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-zinc-50">
      <Drawer buttonText="Open Menu" links={menuItems} title="Menu" />
    </div>
  );
}
