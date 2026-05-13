"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Globe, BarChart3, MapPin, Fuel, TrendingUp } from "lucide-react"

export function HeroSection() {
  const scrollToContact = () => {
    document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-background py-24 md:py-36">
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      {/* Ambient glow */}
      <div className="absolute left-1/2 top-0 -translate-x-1/2 h-96 w-[600px] rounded-full bg-primary/20 blur-3xl opacity-40 pointer-events-none" />

      <div className="container relative mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-5xl">

          {/* Sector badge */}
          <div className="mb-8 flex justify-center">
            <Badge
              variant="outline"
              className="gap-2 border-primary/30 bg-primary/10 px-4 py-1.5 text-sm text-primary"
            >
              <Fuel className="h-3.5 w-3.5" />
              Inteligencia Territorial · Sector Hidrocarburos
            </Badge>
          </div>

          {/* Main headline */}
          <h1 className="mb-6 text-center text-balance text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-7xl">
            Datos que{" "}
            <span className="text-primary">transforman</span>{" "}
            el sector energético
          </h1>

          {/* Subheadline */}
          <p className="mx-auto mb-10 max-w-2xl text-center text-pretty text-lg leading-relaxed text-slate-400 md:text-xl">
            BIG-i combina georreferenciación, geoestadística y análisis territorial para convertir
            datos de gasolineras e hidrocarburos en decisiones estratégicas de alto impacto.
          </p>

          {/* CTAs */}
          <div className="mb-16 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              size="lg"
              onClick={scrollToContact}
              className="group w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Solicitar consulta
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => window.open("https://kabgeo.com.mx", "_blank")}
              className="w-full sm:w-auto border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white"
            >
              <Globe className="mr-2 h-4 w-4" />
              Conocer Kab-Geo
            </Button>
          </div>

          {/* Feature grid */}
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              {
                icon: MapPin,
                title: "Georreferenciación",
                description:
                  "Mapeo preciso de estaciones de servicio y puntos de distribución en México.",
              },
              {
                icon: BarChart3,
                title: "Análisis Estadístico",
                description:
                  "Modelos geoestadísticos para proyectar demanda y optimizar operaciones del sector.",
              },
              {
                icon: TrendingUp,
                title: "Inteligencia de Negocio",
                description:
                  "Reportes ejecutivos para operadores, distribuidores y reguladores de hidrocarburos.",
              },
            ].map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="rounded-xl border border-slate-800 bg-slate-900/50 p-6 backdrop-blur-sm"
              >
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="mb-2 font-semibold text-slate-200">{title}</h3>
                <p className="text-sm leading-relaxed text-slate-500">{description}</p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
