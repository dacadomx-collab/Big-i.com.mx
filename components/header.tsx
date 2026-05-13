"use client"

import { Button } from "@/components/ui/button"

export function Header() {
  const scrollToContact = () => {
    document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center">
          <img src="/logo.png" alt="BIG-eye Logo" className="h-12 w-auto object-contain" />
        </div>

        <Button
          size="sm"
          onClick={scrollToContact}
          className="bg-primary text-primary-foreground hover:bg-primary/90"
        >
          Contactar
        </Button>
      </div>
    </header>
  )
}
