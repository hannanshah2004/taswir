"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"

// Mock sentiment analysis results
const mockSentimentResults: Record<string, any> = {
  positive: {
    score: 0.85,
    label: "Positive",
    emotions: {
      joy: 0.7,
      surprise: 0.2,
      trust: 0.6,
      anticipation: 0.3,
      anger: 0.05,
      disgust: 0.02,
      fear: 0.03,
      sadness: 0.1,
    },
    highlights: [
      { text: "love", sentiment: "positive" },
      { text: "amazing", sentiment: "positive" },
      { text: "great", sentiment: "positive" },
      { text: "excellent", sentiment: "positive" },
    ],
  },
  negative: {
    score: 0.15,
    label: "Negative",
    emotions: {
      joy: 0.1,
      surprise: 0.2,
      trust: 0.1,
      anticipation: 0.2,
      anger: 0.6,
      disgust: 0.5,
      fear: 0.4,
      sadness: 0.7,
    },
    highlights: [
      { text: "hate", sentiment: "negative" },
      { text: "terrible", sentiment: "negative" },
      { text: "awful", sentiment: "negative" },
      { text: "disappointed", sentiment: "negative" },
    ],
  },
  neutral: {
    score: 0.5,
    label: "Neutral",
    emotions: {
      joy: 0.3,
      surprise: 0.3,
      trust: 0.4,
      anticipation: 0.3,
      anger: 0.3,
      disgust: 0.2,
      fear: 0.2,
      sadness: 0.3,
    },
    highlights: [
      { text: "think", sentiment: "neutral" },
      { text: "consider", sentiment: "neutral" },
      { text: "maybe", sentiment: "neutral" },
      { text: "possibly", sentiment: "neutral" },
    ],
  },
  mixed: {
    score: 0.6,
    label: "Mixed",
    emotions: {
      joy: 0.5,
      surprise: 0.4,
      trust: 0.3,
      anticipation: 0.4,
      anger: 0.3,
      disgust: 0.2,
      fear: 0.2,
      sadness: 0.4,
    },
    highlights: [
      { text: "good", sentiment: "positive" },
      { text: "bad", sentiment: "negative" },
      { text: "like", sentiment: "positive" },
      { text: "dislike", sentiment: "negative" },
    ],
  },
}

interface SentimentAnalysisProps {
  onSubmit: (data: any) => void
}

export default function SentimentAnalysis({ onSubmit }: SentimentAnalysisProps) {
  const [text, setText] = useState("")
  const [analysisResult, setAnalysisResult] = useState<any>(null)
  const [activeTab, setActiveTab] = useState("input")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // In a real app, we would send the text to a sentiment analysis API
    // For now, we'll use mock data based on keywords in the text
    let result

    const lowerText = text.toLowerCase()
    if (
      lowerText.includes("love") ||
      lowerText.includes("happy") ||
      lowerText.includes("great") ||
      lowerText.includes("excellent") ||
      lowerText.includes("amazing")
    ) {
      result = mockSentimentResults.positive
    } else if (
      lowerText.includes("hate") ||
      lowerText.includes("terrible") ||
      lowerText.includes("awful") ||
      lowerText.includes("bad") ||
      lowerText.includes("disappointed")
    ) {
      result = mockSentimentResults.negative
    } else if (
      (lowerText.includes("good") && lowerText.includes("bad")) ||
      (lowerText.includes("like") && lowerText.includes("dislike")) ||
      (lowerText.includes("happy") && lowerText.includes("sad"))
    ) {
      result = mockSentimentResults.mixed
    } else {
      result = mockSentimentResults.neutral
    }

    setAnalysisResult(result)
    setActiveTab("results")

    // Pass the data to the parent component
    onSubmit({
      text,
      result,
    })
  }

  const highlightSentiment = (text: string, highlights: any[]) => {
    if (!highlights || highlights.length === 0) return text

    let highlightedText = text
    highlights.forEach((highlight) => {
      const regex = new RegExp(`\\b${highlight.text}\\b`, "gi")
      const color =
        highlight.sentiment === "positive"
          ? "text-green-500"
          : highlight.sentiment === "negative"
            ? "text-red-500"
            : "text-blue-500"
      highlightedText = highlightedText.replace(regex, `<span class="${color} font-medium">$&</span>`)
    })

    return <div dangerouslySetInnerHTML={{ __html: highlightedText }} />
  }

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="input">Input</TabsTrigger>
          <TabsTrigger value="results" disabled={!analysisResult}>
            Analysis Results
          </TabsTrigger>
        </TabsList>

        <TabsContent value="input" className="space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="text">Text to Analyze</Label>
              <Textarea
                id="text"
                placeholder="Enter text to analyze sentiment"
                className="min-h-[200px]"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Try including words like "love", "hate", "good", "bad" for demo purposes.
              </p>
            </div>

            <Button type="submit">Analyze Sentiment</Button>
          </form>
        </TabsContent>

        <TabsContent value="results">
          {analysisResult ? (
            <div className="space-y-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium">Overall Sentiment</h3>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        analysisResult.label === "Positive"
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                          : analysisResult.label === "Negative"
                            ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
                            : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100"
                      }`}
                    >
                      {analysisResult.label}
                    </span>
                  </div>

                  <div className="mb-6">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Sentiment Score</span>
                      <span className="text-sm font-medium">{(analysisResult.score * 100).toFixed(0)}%</span>
                    </div>
                    <Progress value={analysisResult.score * 100} className="h-2" />
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-sm font-medium">Emotion Breakdown</h4>
                    <div className="grid grid-cols-2 gap-4">
                      {Object.entries(analysisResult.emotions).map(([emotion, score]: [string, any]) => (
                        <div key={emotion} className="space-y-1">
                          <div className="flex justify-between">
                            <span className="text-xs capitalize">{emotion}</span>
                            <span className="text-xs">{(score * 100).toFixed(0)}%</span>
                          </div>
                          <Progress value={score * 100} className="h-1" />
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-lg font-medium mb-4">Text Analysis</h3>
                  <div className="p-4 bg-muted rounded-md">{highlightSentiment(text, analysisResult.highlights)}</div>
                  <div className="mt-4 text-sm text-muted-foreground">
                    <span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                    <span className="mr-4">Positive</span>
                    <span className="inline-block w-3 h-3 bg-red-500 rounded-full mr-2"></span>
                    <span className="mr-4">Negative</span>
                    <span className="inline-block w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
                    <span>Neutral</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="text-center p-6">
              <p>No analysis results yet. Please submit text to analyze first.</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
