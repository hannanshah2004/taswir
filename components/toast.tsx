"use client"

import { useToast } from "@/components/ui/use-toast"

export function useSuccessToast(message: string) {
  const { toast } = useToast()

  return () => {
    toast({
      title: "Success",
      description: message,
      variant: "default",
      className: "bg-gradient-to-r from-green-400 to-emerald-500 text-white border-green-600",
    })
  }
}

export function useErrorToast(message: string) {
  const { toast } = useToast()

  return () => {
    toast({
      title: "Error",
      description: message,
      variant: "destructive",
      className: "bg-gradient-to-r from-red-400 to-pink-500 text-white border-red-600",
    })
  }
}
