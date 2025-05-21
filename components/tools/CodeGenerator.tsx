"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Clipboard, Check } from "lucide-react"

// Mock code snippets for different languages
const mockCodeSnippets: Record<string, Record<string, string>> = {
  "hello-world": {
    javascript: `// Hello World in JavaScript
console.log("Hello, World!");`,
    python: `# Hello World in Python
print("Hello, World!")`,
    java: `// Hello World in Java
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`,
    "c++": `// Hello World in C++
#include <iostream>

int main() {
    std::cout << "Hello, World!" << std::endl;
    return 0;
}`,
    rust: `// Hello World in Rust
fn main() {
    println!("Hello, World!");
}`,
  },
  "fetch-data": {
    javascript: `// Fetch data from an API in JavaScript
async function fetchData(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

// Usage
fetchData('https://api.example.com/data')
  .then(data => console.log(data))
  .catch(error => console.error(error));`,
    python: `# Fetch data from an API in Python
import requests

def fetch_data(url):
    try:
        response = requests.get(url)
        response.raise_for_status()  # Raise an exception for HTTP errors
        return response.json()
    except requests.exceptions.RequestException as e:
        print(f"Error fetching data: {e}")
        raise

# Usage
try:
    data = fetch_data('https://api.example.com/data')
    print(data)
except Exception as e:
    print(f"An error occurred: {e}")`,
    java: `// Fetch data from an API in Java
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

public class DataFetcher {
    public static String fetchData(String url) throws Exception {
        HttpClient client = HttpClient.newHttpClient();
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(url))
                .build();
        
        HttpResponse<String> response = client.send(request, 
                HttpResponse.BodyHandlers.ofString());
        
        return response.body();
    }
    
    public static void main(String[] args) {
        try {
            String data = fetchData("https://api.example.com/data");
            System.out.println(data);
        } catch (Exception e) {
            System.err.println("Error fetching data: " + e.getMessage());
        }
    }
}`,
  },
  "file-operations": {
    javascript: `// File operations in JavaScript (Node.js)
const fs = require('fs').promises;

async function readFile(filePath) {
  try {
    const data = await fs.readFile(filePath, 'utf8');
    return data;
  } catch (error) {
    console.error('Error reading file:', error);
    throw error;
  }
}

async function writeFile(filePath, content) {
  try {
    await fs.writeFile(filePath, content, 'utf8');
    console.log('File written successfully');
  } catch (error) {
    console.error('Error writing file:', error);
    throw error;
  }
}

// Usage
async function main() {
  try {
    const content = await readFile('input.txt');
    console.log('File content:', content);
    
    await writeFile('output.txt', 'New content');
  } catch (error) {
    console.error('Operation failed:', error);
  }
}

main();`,
    python: `# File operations in Python
def read_file(file_path):
    try:
        with open(file_path, 'r') as file:
            return file.read()
    except Exception as e:
        print(f"Error reading file: {e}")
        raise

def write_file(file_path, content):
    try:
        with open(file_path, 'w') as file:
            file.write(content)
        print("File written successfully")
    except Exception as e:
        print(f"Error writing file: {e}")
        raise

# Usage
try:
    content = read_file('input.txt')
    print(f"File content: {content}")
    
    write_file('output.txt', 'New content')
except Exception as e:
    print(f"Operation failed: {e}")`,
  },
}

interface CodeGeneratorProps {
  onSubmit: (data: any) => void
}

export default function CodeGenerator({ onSubmit }: CodeGeneratorProps) {
  const [language, setLanguage] = useState("javascript")
  const [prompt, setPrompt] = useState("")
  const [generatedCode, setGeneratedCode] = useState("")
  const [activeTab, setActiveTab] = useState("input")
  const [copied, setCopied] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // In a real app, we would send the prompt to an AI model
    // For now, we'll use mock data based on keywords in the prompt
    let codeSnippet = ""

    if (prompt.toLowerCase().includes("hello") || prompt.toLowerCase().includes("greeting")) {
      codeSnippet = mockCodeSnippets["hello-world"][language] || "// No code available for this language"
    } else if (
      prompt.toLowerCase().includes("api") ||
      prompt.toLowerCase().includes("fetch") ||
      prompt.toLowerCase().includes("http")
    ) {
      codeSnippet = mockCodeSnippets["fetch-data"][language] || "// No code available for this language"
    } else if (
      prompt.toLowerCase().includes("file") ||
      prompt.toLowerCase().includes("read") ||
      prompt.toLowerCase().includes("write")
    ) {
      codeSnippet = mockCodeSnippets["file-operations"][language] || "// No code available for this language"
    } else {
      // Default to hello world if no keywords match
      codeSnippet = mockCodeSnippets["hello-world"][language] || "// No code available for this language"
    }

    setGeneratedCode(codeSnippet)
    setActiveTab("output")

    // Pass the data to the parent component
    onSubmit({
      language,
      prompt,
      code: codeSnippet,
    })
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="input">Input</TabsTrigger>
          <TabsTrigger value="output" disabled={!generatedCode}>
            Generated Code
          </TabsTrigger>
        </TabsList>

        <TabsContent value="input" className="space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="language">Programming Language</Label>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger id="language">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="javascript">JavaScript</SelectItem>
                  <SelectItem value="python">Python</SelectItem>
                  <SelectItem value="java">Java</SelectItem>
                  <SelectItem value="c++">C++</SelectItem>
                  <SelectItem value="rust">Rust</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="prompt">Describe what you want to generate</Label>
              <Textarea
                id="prompt"
                placeholder="E.g., 'Create a function to fetch data from an API'"
                className="min-h-[150px]"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Try keywords like "hello world", "fetch data", or "file operations" for demo purposes.
              </p>
            </div>

            <Button type="submit">Generate Code</Button>
          </form>
        </TabsContent>

        <TabsContent value="output">
          {generatedCode ? (
            <Card className="relative">
              <Button variant="ghost" size="icon" className="absolute top-2 right-2 h-8 w-8" onClick={copyToClipboard}>
                {copied ? <Check className="h-4 w-4" /> : <Clipboard className="h-4 w-4" />}
                <span className="sr-only">Copy code</span>
              </Button>
              <pre className="p-4 rounded-md bg-muted overflow-x-auto font-mono text-sm">
                <code>{generatedCode}</code>
              </pre>
            </Card>
          ) : (
            <div className="text-center p-6">
              <p>No code generated yet. Please submit a prompt first.</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
