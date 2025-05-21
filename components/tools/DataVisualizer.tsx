"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

// Mock data for different chart types
const mockBarData = [
  { name: "Jan", value: 400 },
  { name: "Feb", value: 300 },
  { name: "Mar", value: 600 },
  { name: "Apr", value: 800 },
  { name: "May", value: 500 },
  { name: "Jun", value: 900 },
]

const mockLineData = [
  { name: "Jan", value: 400 },
  { name: "Feb", value: 300 },
  { name: "Mar", value: 600 },
  { name: "Apr", value: 800 },
  { name: "May", value: 500 },
  { name: "Jun", value: 900 },
  { name: "Jul", value: 1000 },
  { name: "Aug", value: 1200 },
  { name: "Sep", value: 900 },
]

const mockPieData = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8", "#82ca9d"]

interface DataVisualizerProps {
  onSubmit: (data: any) => void
}

export default function DataVisualizer({ onSubmit }: DataVisualizerProps) {
  const [dataFormat, setDataFormat] = useState("csv")
  const [chartType, setChartType] = useState("bar")
  const [inputData, setInputData] = useState("")
  const [visualizationData, setVisualizationData] = useState<any>(null)
  const [activeTab, setActiveTab] = useState("input")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // In a real app, we would parse the input data
    // For now, we'll use mock data based on the chart type
    let mockData
    if (chartType === "bar") {
      mockData = mockBarData
    } else if (chartType === "line") {
      mockData = mockLineData
    } else if (chartType === "pie") {
      mockData = mockPieData
    }

    setVisualizationData(mockData)
    setActiveTab("visualization")

    // Pass the data to the parent component
    onSubmit({
      dataFormat,
      chartType,
      data: mockData,
    })
  }

  const renderChart = () => {
    if (!visualizationData) return null

    switch (chartType) {
      case "bar":
        return (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={visualizationData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        )
      case "line":
        return (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={visualizationData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        )
      case "pie":
        return (
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={visualizationData}
                cx="50%"
                cy="50%"
                labelLine={true}
                outerRadius={150}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {visualizationData.map((entry: any, index: number) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        )
      default:
        return null
    }
  }

  const getDataPlaceholder = () => {
    if (dataFormat === "csv") {
      return "name,value\nJan,400\nFeb,300\nMar,600\nApr,800\nMay,500\nJun,900"
    } else if (dataFormat === "json") {
      return JSON.stringify(
        [
          { name: "Jan", value: 400 },
          { name: "Feb", value: 300 },
          { name: "Mar", value: 600 },
        ],
        null,
        2,
      )
    }
    return ""
  }

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="input">Input Data</TabsTrigger>
          <TabsTrigger value="visualization" disabled={!visualizationData}>
            Visualization
          </TabsTrigger>
        </TabsList>

        <TabsContent value="input" className="space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="dataFormat">Data Format</Label>
                <Select value={dataFormat} onValueChange={setDataFormat}>
                  <SelectTrigger id="dataFormat">
                    <SelectValue placeholder="Select format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="csv">CSV</SelectItem>
                    <SelectItem value="json">JSON</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="chartType">Chart Type</Label>
                <Select value={chartType} onValueChange={setChartType}>
                  <SelectTrigger id="chartType">
                    <SelectValue placeholder="Select chart type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bar">Bar Chart</SelectItem>
                    <SelectItem value="line">Line Chart</SelectItem>
                    <SelectItem value="pie">Pie Chart</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="data">Data</Label>
              <Textarea
                id="data"
                placeholder={getDataPlaceholder()}
                className="min-h-[200px] font-mono"
                value={inputData}
                onChange={(e) => setInputData(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Enter your data in {dataFormat.toUpperCase()} format or use the example data.
              </p>
            </div>

            <Button type="submit">Visualize Data</Button>
          </form>
        </TabsContent>

        <TabsContent value="visualization">
          {visualizationData ? (
            <Card className="p-6">
              <h3 className="text-lg font-medium mb-4">
                {chartType.charAt(0).toUpperCase() + chartType.slice(1)} Chart Visualization
              </h3>
              {renderChart()}
            </Card>
          ) : (
            <div className="text-center p-6">
              <p>No data to visualize. Please submit data first.</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
