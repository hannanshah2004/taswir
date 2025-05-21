"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Clipboard, Check } from "lucide-react"

interface TextSummarizerProps {
  onSubmit: (data: any) => void
}

export default function TextSummarizer({ onSubmit }: TextSummarizerProps) {
  const [text, setText] = useState("")
  const [summaryLength, setSummaryLength] = useState(30) // percentage of original
  const [summaryStyle, setSummaryStyle] = useState("concise")
  const [summary, setSummary] = useState("")
  const [keyPoints, setKeyPoints] = useState<string[]>([])
  const [activeTab, setActiveTab] = useState("input")
  const [copied, setCopied] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // In a real app, we would send the text to a summarization API
    // For now, we'll generate a mock summary based on the input text

    // Generate a summary based on the first few sentences and length
    const sentences = text.split(/[.!?]+/).filter(Boolean)
    const summaryCount = Math.max(1, Math.floor((sentences.length * summaryLength) / 100))

    // Take sentences from the beginning, middle and end for a more representative summary
    const selectedSentences = []

    // Beginning
    const beginCount = Math.ceil(summaryCount / 2)
    selectedSentences.push(...sentences.slice(0, beginCount).map((s) => s.trim()))

    // End
    if (summaryCount > beginCount) {
      const endCount = summaryCount - beginCount
      selectedSentences.push(...sentences.slice(-endCount).map((s) => s.trim()))
    }

    const generatedSummary = selectedSentences.join(". ") + "."

    // Generate key points based on the summary style
    let points: string[] = []
    if (summaryStyle === "concise") {
      points = [
        "The text discusses " + text.split(" ").slice(0, 5).join(" ") + "...",
        "Key themes include " + getRandomThemes(),
        "The main conclusion is about " + sentences[sentences.length - 1].trim(),
      ]
    } else if (summaryStyle === "detailed") {
      points = [
        "The document begins by introducing " + sentences[0].trim(),
        "It then elaborates on " + sentences[Math.floor(sentences.length / 3)].trim(),
        "Further analysis reveals " + sentences[Math.floor(sentences.length / 2)].trim(),
        "Important considerations include " + getRandomConsiderations(),
        "The text concludes with " + sentences[sentences.length - 1].trim(),
      ]
    } else if (summaryStyle === "bullets") {
      // Extract potential bullet points by looking for sentences with numbers or key phrases
      points = sentences
        .filter(
          (s) =>
            /\d+/.test(s) ||
            /important|key|significant|critical|essential|fundamental|crucial|vital/.test(s.toLowerCase()),
        )
        .slice(0, 5)
        .map((s) => s.trim())

      // If we don't have enough points, add some generic ones
      if (points.length < 3) {
        points = [
          "The text covers " + text.split(" ").slice(0, 5).join(" ") + "...",
          "Key point identified: " + getRandomThemes(),
          "Conclusion: " + sentences[sentences.length - 1].trim(),
        ]
      }
    }

    setSummary(generatedSummary)
    setKeyPoints(points)
    setActiveTab("summary")

    // Pass the data to the parent component
    onSubmit({
      text,
      summaryLength,
      summaryStyle,
      summary: generatedSummary,
      keyPoints: points,
    })
  }

  const getRandomThemes = () => {
    const themes = [
      "innovation and technology",
      "sustainability and environmental impact",
      "economic growth and development",
      "social responsibility and ethics",
      "global collaboration and partnerships",
    ]
    return themes[Math.floor(Math.random() * themes.length)]
  }

  const getRandomConsiderations = () => {
    const considerations = [
      "long-term sustainability",
      "potential risks and challenges",
      "implementation strategies",
      "resource allocation and optimization",
      "stakeholder engagement and communication",
    ]
    return considerations[Math.floor(Math.random() * considerations.length)]
  }

  const copyToClipboard = () => {
    const fullSummary = `${summary}\n\nKey Points:\n${keyPoints.map((point) => `- ${point}`).join("\n")}`
    navigator.clipboard.writeText(fullSummary)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="input">Input</TabsTrigger>
          <TabsTrigger value="summary" disabled={!summary}>
            Summary
          </TabsTrigger>
        </TabsList>

        <TabsContent value="input" className="space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="text">Text to Summarize</Label>
              <Textarea
                id="text"
                placeholder="Enter or paste your text here to summarize..."
                className="min-h-[250px]"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="summaryLength">Summary Length: {summaryLength}%</Label>
              </div>
              <Slider
                id="summaryLength"
                min={10}
                max={50}
                step={5}
                value={[summaryLength]}
                onValueChange={(value) => setSummaryLength(value[0])}
              />
              <p className="text-xs text-muted-foreground">
                Adjust the slider to control the length of the summary relative to the original text.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="summaryStyle">Summary Style</Label>
              <Select value={summaryStyle} onValueChange={setSummaryStyle}>
                <SelectTrigger id="summaryStyle">
                  <SelectValue placeholder="Select style" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="concise">Concise</SelectItem>
                  <SelectItem value="detailed">Detailed</SelectItem>
                  <SelectItem value="bullets">Bullet Points</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button type="submit">Generate Summary</Button>
          </form>
        </TabsContent>

        <TabsContent value="summary">
          {summary ? (
            <Card className="relative">
              <Button variant="ghost" size="icon" className="absolute top-2 right-2 h-8 w-8" onClick={copyToClipboard}>
                {copied ? <Check className="h-4 w-4" /> : <Clipboard className="h-4 w-4" />}
                <span className="sr-only">Copy summary</span>
              </Button>
              <div className="p-6 space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">Summary</h3>
                  <p className="text-sm">{summary}</p>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Key Points</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    {keyPoints.map((point, index) => (
                      <li key={index} className="text-sm">
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-2">
                  <p className="text-xs text-muted-foreground">
                    Summary generated using {summaryStyle} style at {summaryLength}% length.
                  </p>
                </div>
              </div>
            </Card>
          ) : (
            <div className="text-center p-6">
              <p>No summary generated yet. Please submit text to summarize first.</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
