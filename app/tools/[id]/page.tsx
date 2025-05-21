"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import Breadcrumbs from "@/components/Breadcrumbs"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Separator } from "@/components/ui/separator"

// Import tool components
import DataVisualizer from "@/components/tools/DataVisualizer"
import CodeGenerator from "@/components/tools/CodeGenerator"
import TranslationTool from "@/components/tools/TranslationTool"
import SentimentAnalysis from "@/components/tools/SentimentAnalysis"
import TextSummarizer from "@/components/tools/TextSummarizer"
import ImageAnalyzer from "@/components/tools/ImageAnalyzer"
import SessionLogs from "@/components/SessionLogs"

// Mock tool data
const mockTools = {
  "text-summarizer": {
    name: "Text Summarizer",
    description: "Summarize long text into concise points",
    schema: {
      type: "object",
      properties: {
        text: { type: "string" },
        length: { type: "number" },
      },
    },
  },
  "image-analyzer": {
    name: "Image Analyzer",
    description: "Extract information and insights from images",
    schema: {
      type: "object",
      properties: {
        imageUrl: { type: "string" },
      },
    },
  },
  "data-visualizer": {
    name: "Data Visualizer",
    description: "Create visual representations of your data",
    schema: {
      type: "object",
      properties: {
        data: { type: "string" },
        chartType: { type: "string" },
      },
    },
  },
  "code-generator": {
    name: "Code Generator",
    description: "Generate code snippets from natural language",
    schema: {
      type: "object",
      properties: {
        prompt: { type: "string" },
        language: { type: "string" },
      },
    },
  },
  translation: {
    name: "Translation Tool",
    description: "Translate text between multiple languages",
    schema: {
      type: "object",
      properties: {
        text: { type: "string" },
        sourceLanguage: { type: "string" },
        targetLanguage: { type: "string" },
      },
    },
  },
  "sentiment-analysis": {
    name: "Sentiment Analysis",
    description: "Analyze the sentiment of text content",
    schema: {
      type: "object",
      properties: {
        text: { type: "string" },
      },
    },
  },
}

export default function ToolPage() {
  const params = useParams()
  const id = params.id as string
  const [tool, setTool] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [output, setOutput] = useState<any>(null)
  const [outputType, setOutputType] = useState<"markdown" | "list" | "text">("text")
  const [logs, setLogs] = useState<string[]>([])

  useEffect(() => {
    // In a real app, you would fetch the tool data from an API
    // For now, we'll use the mock data
    const toolData = mockTools[id as keyof typeof mockTools]
    if (toolData) {
      setTool(toolData)
    }
    setLoading(false)

    // Reset logs when tool changes
    setLogs(["Session started", "Tool initialized"])
  }, [id])

  const addLog = (message: string) => {
    setLogs((prev) => [...prev, message])
  }

  const handleSubmit = (data: any) => {
    // In a real app, you would send the data to an API
    console.log("Form submitted:", data)

    // Add logs
    addLog("Parameters validated")
    addLog("Processing request...")

    setTimeout(() => {
      addLog("Output generated")

      // Set output based on the tool
      if (id === "text-summarizer") {
        setOutputType("markdown")
        setOutput(
          "## Summary\n\nThis is a mock summary of the text you provided.\n\n- Key point 1\n- Key point 2\n- Key point 3",
        )
      } else if (id === "image-analyzer") {
        setOutputType("list")
        setOutput(["Person detected", "Building in background", "Sunny weather", "Outdoor setting"])
      } else if (id === "data-visualizer") {
        // Output is handled by the component
        setOutputType("text")
        setOutput("Data visualization complete. See the chart above.")
      } else if (id === "code-generator") {
        // Output is handled by the component
        setOutputType("text")
        setOutput("Code generation complete. See the code above.")
      } else if (id === "translation") {
        // Output is handled by the component
        setOutputType("text")
        setOutput("Translation complete. See the translated text above.")
      } else if (id === "sentiment-analysis") {
        // Output is handled by the component
        setOutputType("text")
        setOutput("Sentiment analysis complete. See the results above.")
      } else {
        setOutputType("text")
        setOutput("This is a mock output for the tool you selected.")
      }
    }, 1000)
  }

  const renderToolComponent = () => {
    switch (id) {
      case "text-summarizer":
        return <TextSummarizer onSubmit={handleSubmit} />
      case "image-analyzer":
        return <ImageAnalyzer onSubmit={handleSubmit} />
      case "data-visualizer":
        return <DataVisualizer onSubmit={handleSubmit} />
      case "code-generator":
        return <CodeGenerator onSubmit={handleSubmit} />
      case "translation":
        return <TranslationTool onSubmit={handleSubmit} />
      case "sentiment-analysis":
        return <SentimentAnalysis onSubmit={handleSubmit} />
      default:
        // For other tools, use the dynamic form skeleton
        return (
          <div className="border-2 border-dashed rounded-md p-6 text-center">
            <h2 className="text-xl font-semibold mb-4">Dynamic Form</h2>
            <p className="text-muted-foreground mb-4">Form renders here from JSON schema</p>
            <pre className="bg-muted p-2 rounded text-xs text-left overflow-auto max-h-[200px]">
              {JSON.stringify(tool?.schema, null, 2)}
            </pre>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleSubmit({})
              }}
              className="mt-4"
            >
              <Button type="submit">Run Tool</Button>
            </form>
          </div>
        )
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-t-2 border-r-2 border-brand-500 animate-spin"></div>
          <div className="absolute inset-0 rounded-full border-b-2 border-l-2 border-accent opacity-70 animate-spin animation-delay-200"></div>
        </div>
      </div>
    )
  }

  if (!tool) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-4rem)]">
        <h2 className="text-2xl font-bold mb-4">Tool not found</h2>
        <Button asChild>
          <Link href="/tools">Back to Tools</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Tools", href: "/tools" },
            { label: tool.name, href: `/tools/${id}` },
          ]}
        />
      </motion.div>

      <div className="flex flex-col md:flex-row gap-8 mt-6">
        {/* Left panel */}
        <motion.div
          className="md:max-w-sm w-full md:sticky md:top-20 md:self-start md:border-l-4 md:border-gradient-to-b md:from-brand-400 md:to-accent md:pl-4 md:h-fit"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <h1 className="text-2xl font-bold brand-text">{tool.name}</h1>
          <p className="text-muted-foreground mt-2">{tool.description}</p>
        </motion.div>

        {/* Right panel */}
        <motion.div
          className="flex-1"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          {/* Tool Component */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="glass-card rounded-xl p-6"
          >
            {renderToolComponent()}
          </motion.div>

          <Separator className="my-6 hover:shadow-[0_0_8px_theme(colors.accent)]/40 transition-shadow" />

          {/* Tool Output */}
          <AnimatePresence>
            {output && (
              <motion.div
                className="mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <h2 className="text-xl font-semibold mb-4 brand-text">Output</h2>
                <div className="glass-card rounded-xl p-6">
                  {outputType === "markdown" && <div className="prose dark:prose-invert max-w-none">{output}</div>}
                  {outputType === "list" && (
                    <ul className="list-disc pl-5 space-y-2">
                      {output.map((item: string, index: number) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  )}
                  {outputType === "text" && (
                    <pre className="bg-muted p-4 rounded-md overflow-auto whitespace-pre-wrap text-sm">{output}</pre>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Session Logs */}
          <SessionLogs logs={logs} />
        </motion.div>
      </div>
    </div>
  )
}
