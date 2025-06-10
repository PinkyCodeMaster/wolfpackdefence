"use client"

import AnimatedMobileNavItem from "./animated-mobile-nav-item";
import FluidAccountDropdown from "./fluid-account-dropdown";
import { motion, AnimatePresence } from "framer-motion";
import { ModeToggle } from "../theme/theme-toggle";
import AnimatedNavItem from "./animated-nav-item";
import { Button } from "@/components/ui/button";
import { Menu, X, Search } from "lucide-react";
import { usePathname } from "next/navigation";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";

// Navigation items
const navigationItems = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Projects", href: "/projects" },
  { name: "Team", href: "/team" },
  { name: "Analytics", href: "/analytics" },
  { name: "Settings", href: "/settings" },
]

// Mock user data - replace with your auth system
const user = {
  name: "Sarah Johnson",
  email: "sarah@example.com",
  image: "/diverse-person-portrait.png",
}

export default function MainHeader() {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close mobile menu when path changes
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out",
        isScrolled ? "backdrop-blur-md shadow-sm py-2" : " backdrop-blur-sm py-4",
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <motion.div
              className="w-8 h-8 rounded-full bg-gradient-to-tr from-violet-500 to-indigo-600 flex items-center justify-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-white font-bold text-lg">M</span>
            </motion.div>
            <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-violet-500 to-indigo-600">
              ModenWebT
            </span>
          </Link>

          {/* Desktop Navigation - Now with animated nav items */}
          <nav className="hidden md:flex items-center space-x-1">
            <AnimatePresence>
              {navigationItems.map((item) => {
                const isActive = pathname === item.href

                return (
                  <AnimatedNavItem key={item.name} href={item.href} isActive={isActive}>
                    {item.name}
                  </AnimatedNavItem>
                )
              })}
            </AnimatePresence>
          </nav>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {/* Search - Desktop only */}
            <div className="hidden md:flex relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                type="search"
                placeholder="Search..."
                className="pl-9 w-[180px] lg:w-[240px] h-9 bg-gray-50 border border-gray-200 focus-visible:ring-1 focus-visible:ring-violet-500"
              />
            </div>

            {/* Notifications */}
            <ModeToggle />
            {/* User Account Dropdown */}
            <FluidAccountDropdown user={user} />

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden overflow-hidden bg-white dark:bg-black"
            >
              <div className="py-4 space-y-1">
                {/* Mobile Search */}
                <div className="relative mb-4">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                  <Input type="search" placeholder="Search..." className="pl-9 bg-gray-50 border border-gray-200" />
                </div>

                {/* Mobile Nav Links - Now with animated mobile nav items */}
                {navigationItems.map((item) => {
                  const isActive = pathname === item.href
                  return (
                    <AnimatedMobileNavItem key={item.name} href={item.href} isActive={isActive}>
                      {item.name}
                    </AnimatedMobileNavItem>
                  )
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}
