"use client"

import type React from "react"

import { motion } from "framer-motion"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { useState } from "react"

interface AnimatedNavItemProps {
  href: string
  isActive: boolean
  children: React.ReactNode
}

export default function AnimatedNavItem({ href, isActive, children }: AnimatedNavItemProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Link
      href={href}
      className={cn(
        "relative px-3 py-2 rounded-md text-sm font-medium transition-all duration-200",
        isActive ? "text-violet-700" : "text-gray-600 hover:text-gray-900",
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span className="relative z-10">{children}</span>

      {/* Background hover effect */}
      {isHovered && !isActive && (
        <motion.div
          className="absolute inset-0 bg-gray-100 rounded-md z-0"
          layoutId="navHover"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        />
      )}

      {/* Active indicator */}
      {isActive && (
        <motion.div
          layoutId="activeIndicator"
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-violet-500 to-indigo-600 rounded-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        />
      )}
    </Link>
  )
}
