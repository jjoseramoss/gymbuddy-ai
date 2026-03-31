import type { ReactNode } from "react";

import { BottomTabBar } from "@/components/BottomTabBar";
import { DesktopNav } from "@/components/DesktopNav";

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-dvh bg-[color:var(--gb-bg)]">
      <DesktopNav />
      <div className="min-h-dvh pb-20 md:pb-8 md:pl-64">
        <div className="mx-auto min-h-dvh w-full max-w-7xl">{children}</div>
      </div>
      <div className="md:hidden">
        <BottomTabBar />
      </div>
    </div>
  );
}
