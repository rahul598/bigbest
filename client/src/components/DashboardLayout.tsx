import { DashboardHeader } from "./DashboardHeader";
import { DashboardFooter } from "./DashboardFooter";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <DashboardHeader />
      <main className="flex-1 container mx-auto px-4 py-8">
        {children}
      </main>
      <DashboardFooter />
    </div>
  );
}
