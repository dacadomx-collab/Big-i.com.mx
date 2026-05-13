"use client"

import { Badge } from "@/components/ui/badge"
import { Construction } from "lucide-react"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center">
          <img src="/logo.png" alt="BIG-eye Logo" className="h-12 w-auto object-contain" />
        </div>
        
        <Badge 
          variant="outline" 
          className="border-primary/50 bg-primary/5 text-primary"
        >
          <Construction className="mr-1.5 h-3 w-3" />
          Fase Beta / Construyendo
        </Badge>
      </div>
    </header>
  )
}
