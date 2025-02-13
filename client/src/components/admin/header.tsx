import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { Link } from "wouter";

interface AdminHeaderProps {
  onMenuClick: () => void;
}

export function AdminHeader({ onMenuClick }: AdminHeaderProps) {
  const { user, logoutMutation } = useAuth();

  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50 h-16">
      <div className="flex items-center justify-between h-full px-4">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" onClick={onMenuClick}>
            <Menu className="h-6 w-6" />
          </Button>
          <Link href="/admin/dashboard" className="ml-4 text-xl font-bold">
            Admin Dashboard
          </Link>
        </div>
        <div className="flex items-center gap-4">
          {user && (
            <>
              <span className="text-sm text-gray-600">
                Welcome, {user.username}
              </span>
              <Button
                variant="outline"
                onClick={() => logoutMutation.mutate()}
                className="text-sm"
              >
                Logout
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
