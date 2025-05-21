"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface DynamicFormSkeletonProps {
  schema: any
  onSubmit: (data: any) => void
  loading: boolean
}

export default function DynamicFormSkeleton({ schema, onSubmit, loading }: DynamicFormSkeletonProps) {
  const [formData, setFormData] = useState({})
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Simulate schema loading
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 800)
    return () => clearTimeout(timer)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="space-y-4 w-full max-w-md">
          <div className="flex justify-between items-center">
            <Skeleton className="h-8 w-[120px]" />
            <Skeleton className="h-6 w-[80px]" />
          </div>
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-10 w-[100px]" />
        </div>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ borderStyle: "dashed", opacity: 0.7 }}
      animate={{
        borderStyle: isLoaded ? "solid" : "dashed",
        opacity: 1,
      }}
      transition={{ duration: 0.5 }}
      className={cn(
        "border-2 rounded-md p-6 text-center",
        isLoaded ? "border-brand-200 dark:border-brand-800" : "border-dashed border-brand-300 dark:border-brand-700",
      )}
    >
      <motion.div initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }}>
        <h2 className="text-xl font-semibold mb-4 gradient-text">Dynamic Form</h2>
        <p className="text-muted-foreground mb-4">Form renders here from JSON schema</p>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
        >
          <pre className="bg-muted/50 dark:bg-muted/20 p-2 rounded text-xs text-left overflow-auto max-h-[200px]">
            {JSON.stringify(schema, null, 2)}
          </pre>
        </motion.div>
        <form onSubmit={handleSubmit} className="mt-4">
          <Button type="submit" className="bg-brand-500 hover:bg-brand-600 active-scale">
            Run Tool
          </Button>
        </form>
      </motion.div>
    </motion.div>
  )
}
