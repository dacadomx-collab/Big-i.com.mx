"use client"

import { Button } from "@/components/ui/button"
import { ArrowDown, Globe, BarChart3, MapPin } from "lucide-react"

export function HeroSection() {
  const scrollToContact = () => {
    document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="relative overflow-hidden bg-slate-50 py-20 md:py-32">
      {/* Subtle grid pattern background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f010_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f010_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      
      {/* Decorative elements */}
      <div className="absolute right-0 top-0 -z-10 h-96 w-96 opacity-20">
        <div className="absolute h-full w-full rounded-full bg-primary/20 blur-3xl" />
      </div>
      
      <div className="container relative mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-4xl text-center">
          {/* Floating icons */}
          <div className="mb-8 flex items-center justify-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
              <Globe className="h-6 w-6 text-primary" />
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
              <BarChart3 className="h-6 w-6 text-primary" />
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
              <MapPin className="h-6 w-6 text-primary" />
            </div>
          </div>

          <h1 className="mb-6 text-balance text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
            ESTAMOS CONSTRUYENDO NUESTRA{" "}
            <span className="text-primary">ETAPA FULL</span>
          </h1>
          
          <p className="mx-auto mb-10 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground md:text-xl">
            Próximamente lanzaremos nuestra plataforma integral de inteligencia territorial, 
            georreferenciación y análisis estadístico. Transformamos datos espaciales en 
            decisiones estratégicas.
          </p>
          
          <Button 
            size="lg" 
            onClick={scrollToContact}
            className="group bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Contactar ahora
            <ArrowDown className="ml-2 h-4 w-4 transition-transform group-hover:translate-y-0.5" />
          </Button>
        </div>
      </div>
    </section>
  )
}
