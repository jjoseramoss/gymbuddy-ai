import type { ReactNode } from "react";

export function TopBar({ title, right }: { title: string; right?: ReactNode }) {
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--gb-border)] bg-[color:var(--gb-bg)]/80 backdrop-blur md:hidden">
      <div className="mx-auto flex h-14 max-w-md items-center justify-between px-4">
        <h1 className="text-base font-semibold tracking-tight">{title}</h1>
        <div className="flex items-center gap-2">{right}</div>
      </div>
    </header>
  );
}
