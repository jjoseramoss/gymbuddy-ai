import type { ReactNode } from "react";

import { BottomTabBar } from "@/components/BottomTabBar";
import { DesktopNav } from "@/components/DesktopNav";

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-dvh">
      <DesktopNav />
      <div className="mx-auto min-h-dvh max-w-6xl pb-20 md:pb-8">{children}</div>
      <div className="md:hidden">
        <BottomTabBar />
      </div>
    </div>
  );
}
