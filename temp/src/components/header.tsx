import { useState, useEffect } from "react";
import { Button } from "../components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
import { Link } from "wouter";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const servicesMenu = [
    {
      title: "Academic Services",
      items: [
        { name: "Mock Exams", path: "/mockexam" },
        { name: "Holiday Classes", path: "/holidayclasses" },
        { name: "Tuition", path: "/tution" },
      ]
    },
    {
      title: "Exam Preparation",
      items: [
        { name: "Trafford Test", path: "/trafford" },
        { name: "Study Materials", path: "/materials" },
        { name: "Practice Tests", path: "/practice" },
      ]
    },
    {
      title: "Shop",
      items: [
        { name: "Books & Resources", path: "/shop/books" },
        { name: "Study Guides", path: "/shop/guides" },
        { name: "Mock Papers", path: "/shop/papers" },
      ]
    }
  ];

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
            <div className="relative group">
              <button 
                className="flex items-center text-[#2D3648] hover:text-[#00AA9B] font-medium transition-colors"
                onClick={() => setIsServicesOpen(!isServicesOpen)}
              >
                Services <ChevronDown className="ml-1 h-4 w-4" />
              </button>

              <div className={`absolute top-full left-0 w-[600px] bg-white shadow-lg rounded-lg p-6 grid grid-cols-3 gap-8 transition-all duration-200 ${
                isServicesOpen ? "opacity-100 visible" : "opacity-0 invisible"
              }`}
              onMouseLeave={() => setIsServicesOpen(false)}
              >
                {servicesMenu.map((section, idx) => (
                  <div key={idx} className="space-y-4">
                    <h3 className="font-semibold text-[#2D3648]">{section.title}</h3>
                    <ul className="space-y-2">
                      {section.items.map((item, itemIdx) => (
                        <li key={itemIdx}>
                          <Link
                            href={item.path}
                            className="text-gray-600 hover:text-[#00AA9B] block transition-colors"
                          >
                            {item.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <Link
              href="/trafford"
              className="text-[#2D3648] hover:text-[#00AA9B] font-medium transition-colors"
            >
              Trafford
            </Link>

            <Link
              href="/about"
              className="text-[#2D3648] hover:text-[#00AA9B] font-medium transition-colors"
            >
              About Us
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
              <Button variant="ghost" size="sm" className="relative w-10 h-10 p-0">
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
              <Button
                onClick={() => console.log("Redirect to Login")}
                className="bg-[#00AA9B] text-white hover:bg-[#009488] border-none px-6 login-btn"
              >
                Login
              </Button>
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
              {servicesMenu.map((section) => 
                section.items.map((item, idx) => (
                  <Link
                    key={idx}
                    href={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className="text-[#2D3648] hover:text-[#00AA9B] font-medium px-4 pl-8"
                  >
                    {item.name}
                  </Link>
                ))
              )}
              <Link
                href="/trafford"
                onClick={() => setIsMenuOpen(false)}
                className="text-[#2D3648] hover:text-[#00AA9B] font-medium px-4"
              >
                Trafford
              </Link>
              <Link
                href="/about-us"
                onClick={() => setIsMenuOpen(false)}
                className="text-[#2D3648] hover:text-[#00AA9B] font-medium px-4"
              >
                About Us
              </Link>
              <Link
                href="/contact-us"
                onClick={() => setIsMenuOpen(false)}
                className="text-[#2D3648] hover:text-[#00AA9B] font-medium px-4"
              >
                Contact Us
              </Link>
              <div className="px-4">
                <Button
                  onClick={() => {
                    console.log("Redirect to Login");
                    setIsMenuOpen(false);
                  }}
                  className="w-full bg-[#00AA9B] text-white hover:bg-[#009488] border-none"
                >
                  Login / Sign up
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}