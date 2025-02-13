import { useState } from "react";
import { AdminHeader } from "./header";
import { AdminSidebar } from "./sidebar";
import { AdminFooter } from "./footer";

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminHeader onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />
      <div className="flex pt-16">
        <AdminSidebar isOpen={isSidebarOpen} />
        <main className={`flex-1 p-6 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
          <div className="max-w-7xl mx-auto space-y-6">
            {children}
          </div>
        </main>
      </div>
      <AdminFooter />
    </div>
  );
}