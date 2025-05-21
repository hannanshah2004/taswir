"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

// TODO: Implement OAuth authentication with Browserbase

export default function SignInDialog() {
  const [open, setOpen] = useState(false)

  const handleSignIn = () => {
    // TODO: Implement OAuth flow
    console.log("Sign in with Browserbase")
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Sign In</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Sign in to Taswir</DialogTitle>
          <DialogDescription>Authenticate with Browserbase to access all features.</DialogDescription>
        </DialogHeader>
        <div className="flex items-center justify-center py-6">
          <Button onClick={handleSignIn} className="w-full">
            Sign in with Browserbase
          </Button>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
