"use client"

import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"

interface ToolCardProps {
  id: string
  name: string
  description: string
  returnType?: string
  index?: number
}

export default function ToolCard({ id, name, description, returnType = "text", index = 0 }: ToolCardProps) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            type: "spring",
            stiffness: 300,
            damping: 24,
            delay: index * 0.1,
          },
        },
      }}
      className="hover-lift"
    >
      <Card className="glass-card overflow-hidden h-full flex flex-col">
        <CardHeader>
          <CardTitle className="text-xl">{name}</CardTitle>
        </CardHeader>
        <CardContent className="flex-grow">
          <p className="text-sm text-muted-foreground">{description}</p>
        </CardContent>
        <CardFooter className="pt-0">
          <div className="w-full group">
            <Button
              asChild
              variant="outline"
              className="w-full text-brand-700 dark:text-brand-300 border-brand-700 dark:border-brand-300 hover:bg-brand-50 dark:hover:bg-brand-900/20 group-hover:pr-4 transition-all active-scale"
            >
              <Link href={`/tools/${id}`} className="flex items-center justify-center">
                <span className="mr-2">Open</span>
                <ArrowRight className="h-4 w-4 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
              </Link>
            </Button>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
