import { Card, CardContent } from "@/components/ui/card"
import {
  Building2,
  Droplet,
  Home,
  Truck,
  BarChart3,
  Users,
  ShieldCheck,
  Landmark,
  MapPin,
  Leaf,
  AlertTriangle,
  Map,
} from "lucide-react"

const services = [
  {
    icon: Building2,
    title: "Infraestructura Pública",
  },
  {
    icon: Droplet,
    title: "Agua y Recursos Hidráulicos",
  },
  {
    icon: Home,
    title: "Sector Inmobiliario",
  },
  {
    icon: Truck,
    title: "Movilidad y Logística",
  },
  {
    icon: BarChart3,
    title: "Investigación y Desarrollo",
  },
  {
    icon: Users,
    title: "Desarrollo Social y Humano",
  },
  {
    icon: ShieldCheck,
    title: "Seguridad Pública y Privada",
  },
  {
    icon: Landmark,
    title: "Político y Electoral",
  },
  {
    icon: MapPin,
    title: "Geomarketing",
  },
  {
    icon: Leaf,
    title: "Medio Ambiente Natural",
  },
  {
    icon: AlertTriangle,
    title: "Evaluación de Riesgos y Protección Civil",
  },
  {
    icon: Map,
    title: "Desarrollo Urbano y Catastro",
  },
]

export function ServicesSection() {
  return (
    <section className="bg-background py-20 md:py-28">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Lo que viene en la Etapa{" "}
            <span className="text-primary">FULL</span>
          </h2>
          <p className="text-muted-foreground">
            Soluciones integrales de inteligencia territorial para cada sector
          </p>
        </div>

        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {services.map((service) => (
            <Card
              key={service.title}
              className="group border-border/50 bg-card transition-all duration-300 hover:border-primary/30 hover:shadow-md"
            >
              <CardContent className="flex items-center gap-4 p-5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary/15">
                  <service.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-sm font-medium leading-tight text-card-foreground">
                  {service.title}
                </h3>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
