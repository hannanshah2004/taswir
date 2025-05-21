"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ModeToggle } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import { useSidebar } from "@/components/sidebar-context"
import { motion } from "framer-motion"

export default function Navbar() {
  const { toggleSidebar } = useSidebar()
  const pathname = usePathname()

  const navItems = [
    { href: "/", label: "Connect" },
    { href: "/tools", label: "Tools" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full glass-navbar">
      <div className="container flex h-16 items-center">
        <Button variant="ghost" size="icon" className="md:hidden mr-2" onClick={toggleSidebar}>
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle sidebar</span>
        </Button>
        <motion.div
          className="flex items-center gap-2 mr-4"
          whileHover={{ scale: 1.05, rotate: 1 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <Link href="/" className="flex items-center">
            <span className="text-3xl tracking-tight text-brand-700 dark:text-brand-300 font-semibold drop-shadow-sm transform hover:scale-105 transition-transform">
              Taswir
            </span>
          </Link>
        </motion.div>

        <div className="flex-1"></div>

        <div className="flex items-center gap-4">
          <ModeToggle />
        </div>
      </div>
    </header>
  )
}
