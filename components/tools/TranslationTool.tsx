"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Clipboard, Check, ArrowRightLeft } from "lucide-react"

// Mock translations for demo purposes
const mockTranslations: Record<string, Record<string, string>> = {
  en: {
    es: {
      Hello: "Hola",
      "Good morning": "Buenos días",
      "How are you?": "¿Cómo estás?",
      "Thank you": "Gracias",
      Goodbye: "Adiós",
      Welcome: "Bienvenido",
      "What is your name?": "¿Cómo te llamas?",
      "My name is": "Me llamo",
      "I don't understand": "No entiendo",
      Please: "Por favor",
    },
    fr: {
      Hello: "Bonjour",
      "Good morning": "Bon matin",
      "How are you?": "Comment allez-vous?",
      "Thank you": "Merci",
      Goodbye: "Au revoir",
      Welcome: "Bienvenue",
      "What is your name?": "Comment vous appelez-vous?",
      "My name is": "Je m'appelle",
      "I don't understand": "Je ne comprends pas",
      Please: "S'il vous plaît",
    },
    de: {
      Hello: "Hallo",
      "Good morning": "Guten Morgen",
      "How are you?": "Wie geht es dir?",
      "Thank you": "Danke",
      Goodbye: "Auf Wiedersehen",
      Welcome: "Willkommen",
      "What is your name?": "Wie heißt du?",
      "My name is": "Ich heiße",
      "I don't understand": "Ich verstehe nicht",
      Please: "Bitte",
    },
  },
  es: {
    en: {
      Hola: "Hello",
      "Buenos días": "Good morning",
      "¿Cómo estás?": "How are you?",
      Gracias: "Thank you",
      Adiós: "Goodbye",
      Bienvenido: "Welcome",
      "¿Cómo te llamas?": "What is your name?",
      "Me llamo": "My name is",
      "No entiendo": "I don't understand",
      "Por favor": "Please",
    },
  },
  fr: {
    en: {
      Bonjour: "Hello",
      "Bon matin": "Good morning",
      "Comment allez-vous?": "How are you?",
      Merci: "Thank you",
      "Au revoir": "Goodbye",
      Bienvenue: "Welcome",
      "Comment vous appelez-vous?": "What is your name?",
      "Je m'appelle": "My name is",
      "Je ne comprends pas": "I don't understand",
      "S'il vous plaît": "Please",
    },
  },
  de: {
    en: {
      Hallo: "Hello",
      "Guten Morgen": "Good morning",
      "Wie geht es dir?": "How are you?",
      Danke: "Thank you",
      "Auf Wiedersehen": "Goodbye",
      Willkommen: "Welcome",
      "Wie heißt du?": "What is your name?",
      "Ich heiße": "My name is",
      "Ich verstehe nicht": "I don't understand",
      Bitte: "Please",
    },
  },
}

interface TranslationToolProps {
  onSubmit: (data: any) => void
}

export default function TranslationTool({ onSubmit }: TranslationToolProps) {
  const [sourceLanguage, setSourceLanguage] = useState("en")
  const [targetLanguage, setTargetLanguage] = useState("es")
  const [sourceText, setSourceText] = useState("")
  const [translatedText, setTranslatedText] = useState("")
  const [activeTab, setActiveTab] = useState("input")
  const [copied, setCopied] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // In a real app, we would send the text to a translation API
    // For now, we'll use mock translations for common phrases
    let translated = ""

    // Check if we have a direct translation for the entire text
    if (
      mockTranslations[sourceLanguage] &&
      mockTranslations[sourceLanguage][targetLanguage] &&
      mockTranslations[sourceLanguage][targetLanguage][sourceText]
    ) {
      translated = mockTranslations[sourceLanguage][targetLanguage][sourceText]
    } else {
      // Otherwise, try to translate word by word or use a fallback
      const words = sourceText.split(" ")
      translated = words
        .map((word) => {
          if (
            mockTranslations[sourceLanguage] &&
            mockTranslations[sourceLanguage][targetLanguage] &&
            mockTranslations[sourceLanguage][targetLanguage][word]
          ) {
            return mockTranslations[sourceLanguage][targetLanguage][word]
          }
          return word // Keep original word if no translation found
        })
        .join(" ")

      // If no translation was found, provide a mock response
      if (translated === sourceText) {
        translated = `[Mock translation of "${sourceText}" from ${sourceLanguage} to ${targetLanguage}]`
      }
    }

    setTranslatedText(translated)
    setActiveTab("output")

    // Pass the data to the parent component
    onSubmit({
      sourceLanguage,
      targetLanguage,
      sourceText,
      translatedText: translated,
    })
  }

  const swapLanguages = () => {
    const temp = sourceLanguage
    setSourceLanguage(targetLanguage)
    setTargetLanguage(temp)
    setSourceText(translatedText)
    setTranslatedText(sourceText)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(translatedText)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="input">Input</TabsTrigger>
          <TabsTrigger value="output" disabled={!translatedText}>
            Translation
          </TabsTrigger>
        </TabsList>

        <TabsContent value="input" className="space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex-1 space-y-2">
                <Label htmlFor="sourceLanguage">Source Language</Label>
                <Select value={sourceLanguage} onValueChange={setSourceLanguage}>
                  <SelectTrigger id="sourceLanguage">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Spanish</SelectItem>
                    <SelectItem value="fr">French</SelectItem>
                    <SelectItem value="de">German</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button
                type="button"
                variant="outline"
                size="icon"
                className="mt-8"
                onClick={swapLanguages}
                title="Swap languages"
              >
                <ArrowRightLeft className="h-4 w-4" />
                <span className="sr-only">Swap languages</span>
              </Button>

              <div className="flex-1 space-y-2">
                <Label htmlFor="targetLanguage">Target Language</Label>
                <Select value={targetLanguage} onValueChange={setTargetLanguage}>
                  <SelectTrigger id="targetLanguage">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Spanish</SelectItem>
                    <SelectItem value="fr">French</SelectItem>
                    <SelectItem value="de">German</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="sourceText">Text to Translate</Label>
              <Textarea
                id="sourceText"
                placeholder="Enter text to translate"
                className="min-h-[150px]"
                value={sourceText}
                onChange={(e) => setSourceText(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Try phrases like "Hello", "Thank you", or "How are you?" for demo purposes.
              </p>
            </div>

            <Button type="submit">Translate</Button>
          </form>
        </TabsContent>

        <TabsContent value="output">
          {translatedText ? (
            <Card className="relative">
              <Button variant="ghost" size="icon" className="absolute top-2 right-2 h-8 w-8" onClick={copyToClipboard}>
                {copied ? <Check className="h-4 w-4" /> : <Clipboard className="h-4 w-4" />}
                <span className="sr-only">Copy translation</span>
              </Button>
              <div className="p-4">
                <h3 className="text-sm font-medium text-muted-foreground mb-2">
                  Translated from{" "}
                  {sourceLanguage === "en"
                    ? "English"
                    : sourceLanguage === "es"
                      ? "Spanish"
                      : sourceLanguage === "fr"
                        ? "French"
                        : "German"}{" "}
                  to{" "}
                  {targetLanguage === "en"
                    ? "English"
                    : targetLanguage === "es"
                      ? "Spanish"
                      : targetLanguage === "fr"
                        ? "French"
                        : "German"}
                </h3>
                <div className="text-lg">{translatedText}</div>
              </div>
            </Card>
          ) : (
            <div className="text-center p-6">
              <p>No translation yet. Please submit text to translate first.</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
