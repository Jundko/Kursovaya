"use client";

import Sidebar from "./menu/Sidebar";

interface PageLayoutProps {
  children: React.ReactNode;
}

export default function PageLayout({ children }: PageLayoutProps) {
  return (
    <div className="flex min-h-screen bg-white">
      <aside className="w-64 bg-white border-r">
        <Sidebar />
      </aside>

      <div className="flex-1 flex flex-col">
        <main className="flex-1 p-4 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}