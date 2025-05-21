"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { motion } from "framer-motion"

export default function Home() {
  const router = useRouter()
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    mcpUrl: "",
    authToken: "",
  })
  const [isValidating, setIsValidating] = useState(false)

  // Auto-focus the first input on page load
  useEffect(() => {
    const timer = setTimeout(() => {
      const input = document.getElementById("mcpUrl")
      if (input) {
        input.focus()
      }
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsValidating(true)

    // Validate form
    if (!formData.mcpUrl || !formData.authToken) {
      setIsValidating(false)
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please fill in all fields",
      })

      // Shake animation for the card
      const card = document.getElementById("connect-card")
      if (card) {
        card.classList.add("animate-[wiggle_0.5s_ease-in-out]")
        setTimeout(() => {
          card.classList.remove("animate-[wiggle_0.5s_ease-in-out]")
        }, 500)
      }
      return
    }

    // In a real app, you would handle the connection logic here
    setTimeout(() => {
      setIsValidating(false)
      toast({
        title: "Connected successfully",
        description: "Redirecting to tools...",
        className: "bg-gradient-to-r from-green-400 to-emerald-500 text-white border-green-600",
      })

      // For now, we'll just navigate to the tools page
      setTimeout(() => {
        router.push("/tools")
      }, 1000)
    }, 1500)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
      },
    },
  }

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
      <motion.div initial="hidden" animate="visible" variants={containerVariants} className="w-full max-w-md px-4">
        <motion.div variants={itemVariants} className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">
            Welcome to <span className="text-brand-700 dark:text-brand-300">Taswir</span>
          </h1>
          <p className="text-muted-foreground">Connect to your instance to get started</p>
        </motion.div>

        <motion.div
          id="connect-card"
          variants={itemVariants}
          className="relative"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-brand-400 to-accent rounded-2xl p-[1px] -z-10" />
          <Card className="glass-card rounded-2xl overflow-hidden">
            <CardHeader></CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="mcpUrl">MCP URL</Label>
                  <Input
                    id="mcpUrl"
                    name="mcpUrl"
                    placeholder="https://example.com/agent"
                    value={formData.mcpUrl}
                    onChange={handleChange}
                    className="focus-visible:ring-brand-400 transition-shadow"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="authToken">Authentication Token</Label>
                  <Input
                    id="authToken"
                    name="authToken"
                    type="password"
                    placeholder="Enter your authentication token"
                    value={formData.authToken}
                    onChange={handleChange}
                    className="focus-visible:ring-accent transition-shadow"
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  type="submit"
                  variant="outline"
                  className="w-full text-brand-700 dark:text-brand-300 border-brand-700 dark:border-brand-300 hover:bg-brand-50 dark:hover:bg-brand-900/20 active-scale"
                  disabled={isValidating}
                >
                  {isValidating ? (
                    <div className="flex items-center">
                      <svg
                        className="animate-spin -ml-1 mr-3 h-4 w-4 text-brand-700 dark:text-brand-300"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Connecting...
                    </div>
                  ) : (
                    "Connect"
                  )}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  )
}
