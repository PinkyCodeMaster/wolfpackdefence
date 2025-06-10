"use client"

import { ChevronDown, UserCircle, Bell, Settings, LogOut, CreditCard } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion, AnimatePresence, MotionConfig } from "framer-motion";
import { useClickAway } from "@/hooks/use-click-away";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import * as React from "react";

interface MenuItem {
  id: string
  label: string
  icon: React.ElementType
  color: string
  shortcut?: string
}

interface User {
  name: string
  email: string
  image: string
}

const menuItems: MenuItem[] = [
  { id: "profile", label: "Profile", icon: UserCircle, color: "#A06CD5", shortcut: "⇧⌘P" },
  { id: "notifications", label: "Notifications", icon: Bell, color: "#FF6B6B", shortcut: "⌘N" },
  { id: "billing", label: "Billing", icon: CreditCard, color: "#4ECDC4", shortcut: "⌘B" },
  { id: "settings", label: "Settings", icon: Settings, color: "#45B7D1", shortcut: "⌘S" },
  { id: "logout", label: "Log out", icon: LogOut, color: "#F9C74F" },
]

const IconWrapper = ({
  icon: Icon,
  isHovered,
  color,
}: {
  icon: React.ElementType
  isHovered: boolean
  color: string
}) => (
  <motion.div className="w-4 h-4 mr-2 relative" initial={false} animate={isHovered ? { scale: 1.2 } : { scale: 1 }}>
    <Icon className="w-4 h-4" />
    {isHovered && (
      <motion.div
        className="absolute inset-0"
        style={{ color }}
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <Icon className="w-4 h-4" strokeWidth={2} />
      </motion.div>
    )}
  </motion.div>
)

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
}

interface FluidAccountDropdownProps {
  user: User
}

export default function FluidAccountDropdown({ user }: FluidAccountDropdownProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  const [hoveredItem, setHoveredItem] = React.useState<string | null>(null)
  const dropdownRef = React.useRef<HTMLDivElement>(null)

  // Handle click outside to close dropdown
  useClickAway(dropdownRef, () => setIsOpen(false))

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsOpen(false)
    }
  }

  return (
    <MotionConfig reducedMotion="user">
      <div className="relative" ref={dropdownRef}>
        <Button
          variant="ghost"
          onClick={() => setIsOpen(!isOpen)}
          className={cn("relative h-9 rounded-full flex items-center gap-2 pl-1 pr-2", isOpen && "bg-gray-100")}
          aria-expanded={isOpen}
          aria-haspopup="true"
        >
          <Avatar className="h-8 w-8 border-2 border-white shadow-sm">
            <AvatarImage src={user.image || "/placeholder.svg"} alt={user.name} />
            <AvatarFallback className="bg-gradient-to-br from-violet-500 to-indigo-600 text-white">
              {user.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <span className="hidden sm:inline text-sm font-medium">{user.name.split(" ")[0]}</span>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "20px",
              height: "20px",
            }}
          >
            <ChevronDown className="h-4 w-4 opacity-50" />
          </motion.div>
        </Button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 1, y: 0, height: 0 }}
              animate={{
                opacity: 1,
                y: 0,
                height: "auto",
                transition: {
                  type: "spring",
                  stiffness: 500,
                  damping: 30,
                  mass: 1,
                },
              }}
              exit={{
                opacity: 0,
                y: 0,
                height: 0,
                transition: {
                  type: "spring",
                  stiffness: 500,
                  damping: 30,
                  mass: 1,
                },
              }}
              className="absolute right-0 top-full mt-2 w-56 z-50"
              onKeyDown={handleKeyDown}
            >
              <motion.div
                className={cn("w-full rounded-lg border border-gray-200", "bg-white dark:bg-black p-1 shadow-lg")}
                initial={{ borderRadius: 8 }}
                animate={{
                  borderRadius: 12,
                  transition: { duration: 0.2 },
                }}
                style={{ transformOrigin: "top" }}
              >
                <motion.div className="py-2 relative" variants={containerVariants} initial="hidden" animate="visible">
                  {/* User info section */}
                  <motion.div className="px-4 py-2" variants={itemVariants}>
                    <p className="text-sm font-medium">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </motion.div>

                  <motion.div className="mx-4 my-2 border-t border-gray-200" variants={itemVariants} />

                  {/* Menu items */}
                  <motion.div className="relative py-1">
                    <motion.div
                      layoutId="hover-highlight"
                      className="absolute inset-x-1 bg-gray-100 rounded-md"
                      animate={{
                        y: hoveredItem ? menuItems.findIndex((item) => item.id === hoveredItem) * 36 + 4 : -40, // Hide when nothing is hovered
                        height: 36,
                        opacity: hoveredItem ? 1 : 0,
                      }}
                      transition={{
                        type: "spring",
                        bounce: 0.15,
                        duration: 0.5,
                      }}
                    />

                    {menuItems.map((item) => (
                      <motion.button
                        key={item.id}
                        onClick={() => {
                          // Handle menu item click
                          setIsOpen(false)
                        }}
                        onHoverStart={() => setHoveredItem(item.id)}
                        onHoverEnd={() => setHoveredItem(null)}
                        className={cn(
                          "relative flex w-full items-center justify-between px-4 py-2 text-sm rounded-md",
                          "transition-colors duration-150",
                          "focus:outline-none",
                          item.id === "logout" ? "text-red-500" : "text-gray-700",
                          hoveredItem === item.id && item.id === "logout" ? "text-red-600" : "",
                          hoveredItem === item.id && item.id !== "logout" ? "text-gray-900" : "",
                        )}
                        whileTap={{ scale: 0.98 }}
                        variants={itemVariants}
                      >
                        <div className="flex items-center">
                          <IconWrapper
                            icon={item.icon}
                            isHovered={hoveredItem === item.id}
                            color={item.id === "logout" ? "#EF4444" : item.color}
                          />
                          {item.label}
                        </div>
                        {item.shortcut && <span className="text-xs text-gray-400">{item.shortcut}</span>}
                      </motion.button>
                    ))}
                  </motion.div>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </MotionConfig>
  )
}
