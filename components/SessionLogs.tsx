"use client"

import { useState, useEffect, useRef } from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

interface SessionLogsProps {
  logs: string[]
}

export default function SessionLogs({ logs }: SessionLogsProps) {
  const [value, setValue] = useState<string>("")
  const [newLogAdded, setNewLogAdded] = useState(false)
  const prevLogsLength = useRef(logs.length)
  const logsEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Check if new log was added
    if (logs.length > prevLogsLength.current) {
      setNewLogAdded(true)
      setValue("logs") // Auto-open when new logs arrive

      // Scroll to bottom of logs
      setTimeout(() => {
        logsEndRef.current?.scrollIntoView({ behavior: "smooth" })
      }, 100)

      // Reset flash effect
      setTimeout(() => {
        setNewLogAdded(false)
      }, 1000)
    }

    prevLogsLength.current = logs.length
  }, [logs])

  return (
    <Accordion
      type="single"
      collapsible
      value={value}
      onValueChange={setValue}
      className="w-full glass-card rounded-xl overflow-hidden"
    >
      <AccordionItem value="logs" className="border-b-0">
        <AccordionTrigger
          className={cn(
            "px-4 py-3 hover:bg-brand-100/30 dark:hover:bg-brand-900/20 transition-colors",
            "data-[state=open]:bg-brand-100/50 dark:data-[state=open]:bg-brand-900/30",
            newLogAdded && "bg-green-100/50 dark:bg-green-900/30",
          )}
        >
          <div className="flex items-center">
            <span className="font-medium">Session Logs</span>
            {newLogAdded && (
              <span className="ml-2 text-xs bg-green-500 text-white px-1.5 py-0.5 rounded-full animate-pulse">New</span>
            )}
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <div className="max-h-[250px] overflow-y-auto bg-muted/50 dark:bg-muted/20 rounded-md p-4">
            <pre className="font-mono text-xs">
              <AnimatePresence initial={false}>
                {logs.map((log, index) => (
                  <motion.div
                    key={index}
                    className="py-1"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <span className="text-muted-foreground">[{new Date().toISOString()}]</span> {log}
                  </motion.div>
                ))}
              </AnimatePresence>
              <div ref={logsEndRef} />
            </pre>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
