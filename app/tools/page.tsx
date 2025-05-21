"use client"

import { useEffect, useState } from "react"
import ToolCard from "@/components/ToolCard"
import { motion } from "framer-motion"

// Mock data for tools
const mockTools = [
  {
    id: "text-summarizer",
    name: "Text Summarizer",
    description: "Summarize long text into concise points",
    returnType: "markdown",
  },
  {
    id: "image-analyzer",
    name: "Image Analyzer",
    description: "Extract information and insights from images",
    returnType: "list",
  },
  {
    id: "data-visualizer",
    name: "Data Visualizer",
    description: "Create visual representations of your data",
    returnType: "chart",
  },
  {
    id: "code-generator",
    name: "Code Generator",
    description: "Generate code snippets from natural language",
    returnType: "code",
  },
  {
    id: "translation",
    name: "Translation Tool",
    description: "Translate text between multiple languages",
    returnType: "text",
  },
  {
    id: "sentiment-analysis",
    name: "Sentiment Analysis",
    description: "Analyze the sentiment of text content",
    returnType: "analysis",
  },
]

export default function ToolsPage() {
  const [tools, setTools] = useState(mockTools)

  // In a real app, you would fetch tools from an API
  useEffect(() => {
    // Fetch tools from API
    // For now, we'll use the mock data
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  return (
    <div className="container mx-auto py-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8 text-center md:text-left"
      >
        <h1 className="text-4xl font-bold text-brand-700 dark:text-brand-300 inline-block">Your Tools</h1>
        <p className="text-muted-foreground mt-2">Select a tool to get started</p>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {tools.map((tool, index) => (
          <ToolCard
            key={tool.id}
            id={tool.id}
            name={tool.name}
            description={tool.description}
            returnType={tool.returnType}
            index={index}
          />
        ))}
      </motion.div>
    </div>
  )
}
