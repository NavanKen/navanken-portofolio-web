"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const isHomePage = pathname === "/";

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-black/70 backdrop-blur-md py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500"
          >
            NavanKen
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            {isHomePage ? (
              <>
                <NavLink href="#home">Home</NavLink>
                <NavLink href="#about">About</NavLink>
                <NavLink href="#skills">Skills</NavLink>
                <NavLink href="#projects">Projects</NavLink>
                <NavLink href="#contact">Contact</NavLink>
              </>
            ) : (
              <>
                <NavLink href="/">Home</NavLink>
                <NavLink href="/#about">About</NavLink>
                <NavLink href="/#skills">Skills</NavLink>
                <NavLink href="/#projects">Projects</NavLink>
                <NavLink href="/#contact">Contact</NavLink>
              </>
            )}
          </nav>

          <button
            className="md:hidden text-white focus:outline-none"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden bg-black/90 backdrop-blur-lg"
        >
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-4">
              {isHomePage ? (
                <>
                  <MobileNavLink href="#home" onClick={toggleMobileMenu}>
                    Home
                  </MobileNavLink>
                  <MobileNavLink href="#about" onClick={toggleMobileMenu}>
                    About
                  </MobileNavLink>
                  <MobileNavLink href="#skills" onClick={toggleMobileMenu}>
                    Skills
                  </MobileNavLink>
                  <MobileNavLink href="#projects" onClick={toggleMobileMenu}>
                    Projects
                  </MobileNavLink>
                  <MobileNavLink href="#contact" onClick={toggleMobileMenu}>
                    Contact
                  </MobileNavLink>
                </>
              ) : (
                <>
                  <MobileNavLink href="/" onClick={toggleMobileMenu}>
                    Home
                  </MobileNavLink>
                  <MobileNavLink href="/#about" onClick={toggleMobileMenu}>
                    About
                  </MobileNavLink>
                  <MobileNavLink href="/#skills" onClick={toggleMobileMenu}>
                    Skills
                  </MobileNavLink>
                  <MobileNavLink href="/#projects" onClick={toggleMobileMenu}>
                    Projects
                  </MobileNavLink>
                  <MobileNavLink href="/#contact" onClick={toggleMobileMenu}>
                    Contact
                  </MobileNavLink>
                </>
              )}
            </nav>
          </div>
        </motion.div>
      )}
    </header>
  );
}

function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="text-gray-300 hover:text-white transition-all duration-300 relative group"
    >
      {children}
      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300 group-hover:w-full"></span>
    </Link>
  );
}

function MobileNavLink({
  href,
  onClick,
  children,
}: {
  href: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="text-gray-300 hover:text-white transition-all duration-300 py-2 border-b border-white/10 relative group flex items-center"
      onClick={onClick}
    >
      <span className="w-0 group-hover:w-1 h-4 bg-gradient-to-b from-purple-500 to-pink-500 mr-0 group-hover:mr-2 opacity-0 group-hover:opacity-100 transition-all duration-300"></span>
      <span className="group-hover:translate-x-1 transition-all duration-300">
        {children}
      </span>
    </Link>
  );
}
