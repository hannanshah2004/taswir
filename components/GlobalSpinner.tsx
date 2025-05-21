"use client"

import { motion } from "framer-motion"

interface GlobalSpinnerProps {
  active: boolean
}

export default function GlobalSpinner({ active }: GlobalSpinnerProps) {
  if (!active) return null

  return (
    <motion.div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="glass-card rounded-lg p-8 flex flex-col items-center gap-4"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-t-4 border-r-4 border-brand-500 animate-spin"></div>
          <div className="absolute inset-0 rounded-full border-b-4 border-l-4 border-accent opacity-70 animate-spin animation-delay-200"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-brand-500 animate-pulse"></div>
          </div>
        </div>
        <p className="text-lg font-medium">Loading...</p>
      </motion.div>
    </motion.div>
  )
}
