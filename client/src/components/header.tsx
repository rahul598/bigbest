import { useState, useEffect } from "react";
import { Button } from "../components/ui/button";
import {
  Menu,
  X,
  Book,
  ShoppingBag,
  GraduationCap,
  Calendar,
  Users,
  Building,
} from "lucide-react";
import { Link } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const serviceLinks = [
  {
    title: "Mock Exams",
    href: "/mockexam",
    description: "Practice with our comprehensive mock examination system",
    icon: Book,
  },
  {
    title: "Holiday Classes",
    href: "/holidayclasses",
    description: "Special intensive courses during school holidays",
    icon: Calendar,
  },
  {
    title: "Tuition",
    href: "/tution",
    description: "One-on-one and group tuition sessions",
    icon: GraduationCap,
  },
  {
    title: "Store",
    href: "/store",
    description: "Educational materials, notes and resources",
    icon: ShoppingBag,
  },
  {
    title: "Consultancy",
    href: "/consultancy",
    description: "Expert guidance for academic success",
    icon: Users,
  },
  {
    title: "Trafford",
    href: "/trafford",
    description: "Exclusive Trafford learning programs and resources",
    icon: Building,
  },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, logoutMutation } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full p-4 z-50 transition-colors duration-300 ${
        isScrolled ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/">
            <img
              src="https://vinsonedge.com/wp-content/uploads/2025/01/Logo-3.png"
              alt="11Plus Success"
              className="h-16 cursor-pointer"
            />
          </Link>

          {/* Navigation Links - Hidden on Mobile */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-[#2D3648] hover:text-[#00AA9B] font-medium transition-colors"
            >
              Home
            </Link>

            {/* Services Mega Menu */}
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-[#2D3648] hover:text-[#00AA9B] font-medium">
                    Services
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid w-[600px] gap-3 p-4 md:grid-cols-2">
                      {serviceLinks.map((service) => {
                        const Icon = service.icon;
                        return (
                          <Link
                            key={service.href}
                            href={service.href}
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="flex items-center gap-2">
                              <Icon className="h-5 w-5 text-[#00AA9B]" />
                              <div className="text-sm font-medium leading-none">
                                {service.title}
                              </div>
                            </div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              {service.description}
                            </p>
                          </Link>
                        );
                      })}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <Link
              href="/about"
              className="text-[#2D3648] hover:text-[#00AA9B] font-medium transition-colors"
            >
              About Us
            </Link>
            <Link
              href="/faq"
              className="text-[#2D3648] hover:text-[#00AA9B] font-medium transition-colors"
            >
              FAQ
            </Link>
            <Link
              href="/contact"
              className="text-[#2D3648] hover:text-[#00AA9B] font-medium transition-colors"
            >
              Contact Us
            </Link>
          </nav>

          {/* Right side buttons */}
          <div className="flex items-center gap-4">
            <Link className="mt-2" href="/cart">
              <Button
                variant="ghost"
                size="sm"
                className="relative w-10 h-10 p-0"
              >
                <img
                  src="https://vinsonedge.com/wp-content/uploads/2025/01/Cart.png"
                  alt="Cart"
                  className="h-10 w-10"
                />
                <span className="absolute -top-1 -right-1 bg-[#00AA9B] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  0
                </span>
              </Button>
            </Link>
            <div className="hidden md:block">
              {user ? (
                <div className="flex items-center gap-4">
                  <Link href={`/${user.role.toLowerCase()}/dashboard`}>
                    <Button variant="ghost">Dashboard</Button>
                  </Link>
                  <Button
                    onClick={() => logoutMutation.mutate()}
                    className="bg-[#00AA9B] text-white hover:bg-[#009488] border-none px-6 login-btn"
                  >
                    Logout
                  </Button>
                </div>
              ) : (
                <Link href="/auth">
                  <Button className="bg-[#00AA9B] text-white hover:bg-[#009488] border-none px-6 login-btn">
                    Login
                  </Button>
                </Link>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6 text-[#2D3648]" />
              ) : (
                <Menu className="h-6 w-6 text-[#2D3648]" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white shadow-lg rounded-b-lg">
            <nav className="flex flex-col space-y-4 py-4">
              <Link
                href="/"
                onClick={() => setIsMenuOpen(false)}
                className="text-[#2D3648] hover:text-[#00AA9B] font-medium px-4"
              >
                Home
              </Link>

              {/* Mobile Services Links */}
              {serviceLinks.map((service) => (
                <Link
                  key={service.href}
                  href={service.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-[#2D3648] hover:text-[#00AA9B] font-medium px-4 flex items-center gap-2"
                >
                  <service.icon className="h-4 w-4" />
                  {service.title}
                </Link>
              ))}

              <Link
                href="/about"
                onClick={() => setIsMenuOpen(false)}
                className="text-[#2D3648] hover:text-[#00AA9B] font-medium px-4"
              >
                About Us
              </Link>
              <Link
                href="/contact"
                onClick={() => setIsMenuOpen(false)}
                className="text-[#2D3648] hover:text-[#00AA9B] font-medium px-4"
              >
                Contact Us
              </Link>
              {user ? (
                <>
                  <Link
                    href={`/${user.role.toLowerCase()}/dashboard`}
                    onClick={() => setIsMenuOpen(false)}
                    className="text-[#2D3648] hover:text-[#00AA9B] font-medium px-4"
                  >
                    Dashboard
                  </Link>
                  <div className="px-4">
                    <Button
                      onClick={() => {
                        logoutMutation.mutate();
                        setIsMenuOpen(false);
                      }}
                      className="w-full bg-[#00AA9B] text-white hover:bg-[#009488] border-none"
                    >
                      Logout
                    </Button>
                  </div>
                </>
              ) : (
                <div className="px-4">
                  <Link href="/auth">
                    <Button
                      onClick={() => setIsMenuOpen(false)}
                      className="w-full bg-[#00AA9B] text-white hover:bg-[#009488] border-none"
                    >
                      Login / Sign up
                    </Button>
                  </Link>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
