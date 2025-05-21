"use client"

import { useEffect } from "react"
import { useTheme as useNextTheme } from "next-themes"

export function ModeToggle() {
  const { setTheme } = useNextTheme()

  // Force light theme on component mount
  useEffect(() => {
    setTheme("light")
  }, [setTheme])

  // Return null since we don't need a toggle anymore
  return null
}

import type * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import type { ThemeProviderProps } from "next-themes"

interface ThemeProviderPropsWithChildren extends ThemeProviderProps {
  children: React.ReactNode
}

export function ThemeProvider({ children, ...props }: ThemeProviderPropsWithChildren) {
  return (
    <NextThemesProvider {...props} forcedTheme="light" disableTransitionOnChange>
      {children}
    </NextThemesProvider>
  )
}
