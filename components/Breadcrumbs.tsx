"use client"

import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

interface BreadcrumbItem {
  label: string
  href: string
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
  className?: string
}

export default function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  return (
    <nav className={cn("flex items-center gap-1 text-sm", className)}>
      {items.map((item, index) => (
        <motion.div
          key={item.href}
          className="flex items-center"
          initial={{ opacity: 0, x: -5 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          {index > 0 && <ChevronRight className="h-4 w-4 mx-1 text-muted-foreground" />}
          {index === items.length - 1 ? (
            <span className="font-medium text-brand-600 dark:text-brand-400">{item.label}</span>
          ) : (
            <Link
              href={item.href}
              className="text-muted-foreground hover:text-foreground transition-colors hover:underline"
            >
              {item.label}
            </Link>
          )}
        </motion.div>
      ))}
    </nav>
  )
}
