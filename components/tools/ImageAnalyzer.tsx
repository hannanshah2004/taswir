"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { AlertCircle } from "lucide-react"

// Mock image analysis results
const mockAnalysisResults = {
  objects: [
    { label: "Person", confidence: 0.98, boundingBox: { x: 0.2, y: 0.3, width: 0.3, height: 0.5 } },
    { label: "Car", confidence: 0.92, boundingBox: { x: 0.6, y: 0.7, width: 0.2, height: 0.2 } },
    { label: "Tree", confidence: 0.87, boundingBox: { x: 0.8, y: 0.4, width: 0.15, height: 0.3 } },
  ],
  tags: [
    { name: "outdoor", confidence: 0.95 },
    { name: "urban", confidence: 0.88 },
    { name: "daytime", confidence: 0.97 },
    { name: "street", confidence: 0.85 },
    { name: "city", confidence: 0.82 },
  ],
  colors: [
    { color: "#4285F4", pixelFraction: 0.3, name: "Blue" },
    { color: "#34A853", pixelFraction: 0.2, name: "Green" },
    { color: "#FBBC05", pixelFraction: 0.15, name: "Yellow" },
    { color: "#EA4335", pixelFraction: 0.1, name: "Red" },
    { color: "#FFFFFF", pixelFraction: 0.25, name: "White" },
  ],
  text: ["STOP", "ONE WAY", "Main Street", "Cafe"],
  faces: [
    {
      boundingBox: { x: 0.2, y: 0.3, width: 0.1, height: 0.1 },
      emotions: { joy: 0.8, sorrow: 0.05, anger: 0.02, surprise: 0.13 },
    },
  ],
  landmarks: [],
  safeSearch: {
    adult: "VERY_UNLIKELY",
    spoof: "UNLIKELY",
    medical: "VERY_UNLIKELY",
    violence: "VERY_UNLIKELY",
    racy: "VERY_UNLIKELY",
  },
}

interface ImageAnalyzerProps {
  onSubmit: (data: any) => void
}

export default function ImageAnalyzer({ onSubmit }: ImageAnalyzerProps) {
  const [imageUrl, setImageUrl] = useState("")
  const [file, setFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState("")
  const [analysisOptions, setAnalysisOptions] = useState({
    detectObjects: true,
    detectLabels: true,
    detectColors: true,
    detectText: true,
    detectFaces: true,
    detectLandmarks: false,
    safeSearch: true,
  })
  const [analysisResults, setAnalysisResults] = useState<any>(null)
  const [activeTab, setActiveTab] = useState("input")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
      setImageUrl("")
      setPreviewUrl(URL.createObjectURL(selectedFile))
      setError("")
    }
  }

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageUrl(e.target.value)
    if (e.target.value) {
      setFile(null)
      setPreviewUrl(e.target.value)
    } else {
      setPreviewUrl("")
    }
    setError("")
  }

  const validateImage = () => {
    if (!imageUrl && !file) {
      setError("Please provide an image URL or upload a file")
      return false
    }
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateImage()) {
      return
    }

    setLoading(true)
    setError("")

    try {
      // In a real app, we would send the image to an analysis API
      // For now, we'll use mock data

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Filter results based on selected options
      const results: any = {}

      if (analysisOptions.detectObjects) {
        results.objects = mockAnalysisResults.objects
      }

      if (analysisOptions.detectLabels) {
        results.tags = mockAnalysisResults.tags
      }

      if (analysisOptions.detectColors) {
        results.colors = mockAnalysisResults.colors
      }

      if (analysisOptions.detectText) {
        results.text = mockAnalysisResults.text
      }

      if (analysisOptions.detectFaces) {
        results.faces = mockAnalysisResults.faces
      }

      if (analysisOptions.detectLandmarks) {
        results.landmarks = mockAnalysisResults.landmarks
      }

      if (analysisOptions.safeSearch) {
        results.safeSearch = mockAnalysisResults.safeSearch
      }

      setAnalysisResults(results)
      setActiveTab("results")

      // Pass the data to the parent component
      onSubmit({
        imageUrl: imageUrl || (file ? "file-upload" : ""),
        analysisOptions,
        results,
      })
    } catch (err) {
      setError("An error occurred during image analysis")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const renderAnalysisResults = () => {
    if (!analysisResults) return null

    return (
      <div className="space-y-6">
        {/* Image Preview */}
        <div className="relative">
          <img
            src={previewUrl || "/placeholder.svg"}
            alt="Analyzed image"
            className="w-full h-auto max-h-[400px] object-contain rounded-md"
          />

          {/* Object Detection Overlay */}
          {analysisResults.objects && (
            <div className="absolute inset-0">
              {analysisResults.objects.map((obj: any, index: number) => (
                <div
                  key={index}
                  className="absolute border-2 border-blue-500"
                  style={{
                    left: `${obj.boundingBox.x * 100}%`,
                    top: `${obj.boundingBox.y * 100}%`,
                    width: `${obj.boundingBox.width * 100}%`,
                    height: `${obj.boundingBox.height * 100}%`,
                  }}
                >
                  <span className="absolute top-0 left-0 transform -translate-y-full bg-blue-500 text-white text-xs px-1 rounded">
                    {obj.label} ({Math.round(obj.confidence * 100)}%)
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Tags/Labels */}
        {analysisResults.tags && (
          <div>
            <h3 className="text-lg font-medium mb-2">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {analysisResults.tags.map((tag: any, index: number) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {tag.name} ({Math.round(tag.confidence * 100)}%)
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Colors */}
        {analysisResults.colors && (
          <div>
            <h3 className="text-lg font-medium mb-2">Dominant Colors</h3>
            <div className="flex flex-wrap gap-4">
              {analysisResults.colors.map((color: any, index: number) => (
                <div key={index} className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full border" style={{ backgroundColor: color.color }}></div>
                  <span className="text-xs mt-1">{color.name}</span>
                  <span className="text-xs text-muted-foreground">{Math.round(color.pixelFraction * 100)}%</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Text Detection */}
        {analysisResults.text && analysisResults.text.length > 0 && (
          <div>
            <h3 className="text-lg font-medium mb-2">Detected Text</h3>
            <div className="bg-muted p-3 rounded-md">
              {analysisResults.text.map((text: string, index: number) => (
                <div key={index} className="text-sm">
                  "{text}"
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Face Detection */}
        {analysisResults.faces && analysisResults.faces.length > 0 && (
          <div>
            <h3 className="text-lg font-medium mb-2">Detected Faces</h3>
            <div className="space-y-3">
              {analysisResults.faces.map((face: any, index: number) => (
                <div key={index} className="bg-muted p-3 rounded-md">
                  <h4 className="text-sm font-medium mb-2">Face {index + 1}</h4>
                  <div className="space-y-2">
                    <p className="text-xs text-muted-foreground">Emotions:</p>
                    <div className="grid grid-cols-2 gap-2">
                      {Object.entries(face.emotions).map(([emotion, score]: [string, any]) => (
                        <div key={emotion} className="space-y-1">
                          <div className="flex justify-between">
                            <span className="text-xs capitalize">{emotion}</span>
                            <span className="text-xs">{Math.round(score * 100)}%</span>
                          </div>
                          <Progress value={score * 100} className="h-1" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Safe Search */}
        {analysisResults.safeSearch && (
          <div>
            <h3 className="text-lg font-medium mb-2">Safe Search</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
              {Object.entries(analysisResults.safeSearch).map(([category, likelihood]: [string, any]) => (
                <div key={category} className="bg-muted p-2 rounded-md text-center">
                  <p className="text-xs capitalize">{category}</p>
                  <p className="text-xs font-medium">{likelihood.replace("_", " ")}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="input">Input</TabsTrigger>
          <TabsTrigger value="results" disabled={!analysisResults}>
            Analysis Results
          </TabsTrigger>
        </TabsList>

        <TabsContent value="input" className="space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="imageUrl">Image URL</Label>
              <Input
                id="imageUrl"
                type="url"
                placeholder="https://example.com/image.jpg"
                value={imageUrl}
                onChange={handleUrlChange}
                disabled={!!file}
              />
              <p className="text-xs text-muted-foreground">Enter a URL to an image you want to analyze</p>
            </div>

            <div className="relative">
              <Separator className="my-4" />
              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-2 text-xs text-muted-foreground">
                OR
              </span>
            </div>

            <div className="space-y-2">
              <Label htmlFor="imageFile">Upload Image</Label>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Input
                  id="imageFile"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  disabled={!!imageUrl}
                  className="cursor-pointer"
                />
              </div>
            </div>

            {previewUrl && (
              <div className="mt-4">
                <h3 className="text-sm font-medium mb-2">Preview</h3>
                <div className="border rounded-md p-2 flex justify-center">
                  <img
                    src={previewUrl || "/placeholder.svg"}
                    alt="Preview"
                    className="max-h-[200px] object-contain"
                    onError={() => {
                      setError("Failed to load image. Please check the URL or try another image.")
                      setPreviewUrl("")
                    }}
                  />
                </div>
              </div>
            )}

            {error && (
              <div className="bg-destructive/10 text-destructive flex items-center gap-2 p-3 rounded-md text-sm">
                <AlertCircle className="h-4 w-4" />
                {error}
              </div>
            )}

            <div className="space-y-2">
              <Label>Analysis Options</Label>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="detectObjects"
                    checked={analysisOptions.detectObjects}
                    onCheckedChange={(checked) => setAnalysisOptions({ ...analysisOptions, detectObjects: !!checked })}
                  />
                  <Label htmlFor="detectObjects" className="text-sm">
                    Detect Objects
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="detectLabels"
                    checked={analysisOptions.detectLabels}
                    onCheckedChange={(checked) => setAnalysisOptions({ ...analysisOptions, detectLabels: !!checked })}
                  />
                  <Label htmlFor="detectLabels" className="text-sm">
                    Detect Labels
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="detectColors"
                    checked={analysisOptions.detectColors}
                    onCheckedChange={(checked) => setAnalysisOptions({ ...analysisOptions, detectColors: !!checked })}
                  />
                  <Label htmlFor="detectColors" className="text-sm">
                    Detect Colors
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="detectText"
                    checked={analysisOptions.detectText}
                    onCheckedChange={(checked) => setAnalysisOptions({ ...analysisOptions, detectText: !!checked })}
                  />
                  <Label htmlFor="detectText" className="text-sm">
                    Detect Text
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="detectFaces"
                    checked={analysisOptions.detectFaces}
                    onCheckedChange={(checked) => setAnalysisOptions({ ...analysisOptions, detectFaces: !!checked })}
                  />
                  <Label htmlFor="detectFaces" className="text-sm">
                    Detect Faces
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="detectLandmarks"
                    checked={analysisOptions.detectLandmarks}
                    onCheckedChange={(checked) =>
                      setAnalysisOptions({ ...analysisOptions, detectLandmarks: !!checked })
                    }
                  />
                  <Label htmlFor="detectLandmarks" className="text-sm">
                    Detect Landmarks
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="safeSearch"
                    checked={analysisOptions.safeSearch}
                    onCheckedChange={(checked) => setAnalysisOptions({ ...analysisOptions, safeSearch: !!checked })}
                  />
                  <Label htmlFor="safeSearch" className="text-sm">
                    Safe Search
                  </Label>
                </div>
              </div>
            </div>

            <Button type="submit" disabled={loading || (!imageUrl && !file)}>
              {loading ? "Analyzing..." : "Analyze Image"}
            </Button>
          </form>
        </TabsContent>

        <TabsContent value="results">
          {analysisResults ? (
            <Card className="p-6">{renderAnalysisResults()}</Card>
          ) : (
            <div className="text-center p-6">
              <p>No analysis results yet. Please submit an image to analyze first.</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
