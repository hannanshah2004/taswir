"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { NetworkIcon as Connect, PenToolIcon as ToolIcon } from "lucide-react"
import { useSidebar } from "@/components/sidebar-context"
import { motion, AnimatePresence } from "framer-motion"

export default function Sidebar() {
  const { isOpen, toggleSidebar } = useSidebar()
  const pathname = usePathname()

  return (
    <>
      {/* Mobile sidebar */}
      <Sheet open={isOpen} onOpenChange={toggleSidebar}>
        <SheetContent side="left" className="w-[240px] p-0 glass-sidebar">
          <MobileSidebar pathname={pathname} />
        </SheetContent>
      </Sheet>

      {/* Desktop sidebar */}
      <AnimatePresence initial={false}>
        <motion.div
          className="hidden md:block glass-sidebar h-[calc(100vh-4rem)] w-[240px] overflow-y-auto"
          initial={{ x: -240, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <DesktopSidebar pathname={pathname} />
        </motion.div>
      </AnimatePresence>
    </>
  )
}

function MobileSidebar({ pathname }: { pathname: string }) {
  return (
    <div className="flex flex-col h-full">
      <div className="p-4 font-semibold text-lg border-b border-white/10 dark:border-gray-800/50">
        <span className="brand-text">Taswir</span>
      </div>
      <ScrollArea className="flex-1">
        <SidebarItems pathname={pathname} />
      </ScrollArea>
    </div>
  )
}

function DesktopSidebar({ pathname }: { pathname: string }) {
  return (
    <div className="flex flex-col h-full">
      <ScrollArea className="flex-1 p-4">
        <SidebarItems pathname={pathname} />
      </ScrollArea>
    </div>
  )
}

function SidebarItems({ pathname }: { pathname: string }) {
  const items = [
    {
      title: "Connect",
      href: "/",
      icon: Connect,
    },
    {
      title: "Tools",
      href: "/tools",
      icon: ToolIcon,
    },
  ]

  return (
    <div className="space-y-4 py-4">
      <div className="px-3 py-2">
        <div className="space-y-1">
          {items.map((item) => {
            const isActive = pathname === item.href

            return (
              <Link
                key={item.title}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium relative group",
                  isActive
                    ? "bg-brand-500/20 text-brand-700 dark:text-brand-300"
                    : "text-foreground/70 hover:text-brand-600 dark:hover:text-brand-400 hover:bg-brand-100/30 dark:hover:bg-brand-900/20",
                )}
              >
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.95 }}
                  className={cn("flex items-center justify-center", isActive && "text-brand-600 dark:text-brand-400")}
                >
                  <item.icon className="h-4 w-4" />
                </motion.div>
                <span>{item.title}</span>
                {isActive && (
                  <motion.div
                    layoutId="sidebar-active-pill"
                    className="absolute inset-0 rounded-md bg-gradient-to-r from-brand-400/20 to-accent/20 -z-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
