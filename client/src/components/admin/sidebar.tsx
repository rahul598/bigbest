import { Link, useLocation } from "wouter";
import {
  LayoutDashboard,
  Users,
  FileQuestion,
  Image,
  Presentation,
  ShoppingCart,
  CreditCard,
  GraduationCap,
  ClipboardList
} from "lucide-react";
import { cn } from "@/lib/utils";

interface AdminSidebarProps {
  isOpen: boolean;
}

export function AdminSidebar({ isOpen }: AdminSidebarProps) {
  const [location] = useLocation();

  const menuItems = [
    { 
      icon: LayoutDashboard, 
      label: "Dashboard", 
      href: "/admin/dashboard",
      submenu: [
        { label: "Overview", href: "/admin/dashboard" }
      ]
    },
    { 
      icon: Users, 
      label: "User Management", 
      href: "/admin/users",
      submenu: [
        { label: "All Users", href: "/admin/users" },
        { label: "Profile Settings", href: "/admin/profile" }
      ]
    },
    { 
      icon: FileQuestion, 
      label: "Questions", 
      href: "/admin/questions",
      submenu: [
        { label: "All Questions", href: "/admin/questions" },
        { label: "Categories", href: "/admin/questions/categories" },
        { label: "Subcategories", href: "/admin/questions/subcategories" }
      ]
    },
    { icon: Image, label: "Media", href: "/admin/media" },
    { icon: Presentation, label: "Classes", href: "/admin/classes" },
    { icon: ShoppingCart, label: "Store", href: "/admin/store" },
    { icon: CreditCard, label: "Subscriptions", href: "/admin/subscriptions" },
    { icon: GraduationCap, label: "Exams", href: "/admin/exams" },
    { icon: ClipboardList, label: "Assignments", href: "/admin/assignments" }
  ];

  return (
    <aside
      className={`fixed left-0 top-16 bottom-0 bg-white border-r w-64 transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <nav className="p-4">
        <div className="space-y-1">
          {menuItems.map((item) => {
            const isActive = location.startsWith(item.href);
            return (
              <div key={item.href}>
                <Link href={item.href}>
                  <a className={cn(
                    "flex items-center gap-3 px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors",
                    isActive && "bg-gray-100 text-[#00AA9B]"
                  )}>
                    <item.icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </a>
                </Link>
                {item.submenu && isActive && (
                  <div className="ml-6 mt-1 space-y-1">
                    {item.submenu.map((submenu) => (
                      <Link key={submenu.href} href={submenu.href}>
                        <a className={cn(
                          "block px-4 py-1.5 text-sm text-gray-600 rounded-lg hover:bg-gray-100 transition-colors",
                          location === submenu.href && "text-[#00AA9B] bg-gray-50"
                        )}>
                          {submenu.label}
                        </a>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </nav>
    </aside>
  );
}