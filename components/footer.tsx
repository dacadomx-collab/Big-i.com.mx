import { MapPin, Phone, Mail, User, Globe, ExternalLink } from "lucide-react"
import { Separator } from "@/components/ui/separator"

export function Footer() {
  return (
    <footer id="contacto" className="bg-slate-900 text-slate-100">
      {/* Main CTA Section */}
      <div className="border-b border-slate-800">
        <div className="container mx-auto px-4 py-12 md:px-6 md:py-16">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-2xl font-bold tracking-tight md:text-3xl">
              No detengas tus proyectos
            </h2>
            <p className="text-pretty text-slate-400">
              Nuestra maquinaria técnica y consultiva está 100% operativa.
            </p>
            <p className="mt-2 text-sm text-slate-500">
              Kab-Geo S.A. de C.V. - Centro de Estudios Geoestadísticos e Informáticos (Fusión Corporativa)
            </p>
          </div>
        </div>
      </div>

      {/* Contact Grid */}
      <div className="container mx-auto px-4 py-12 md:px-6">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Sede */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-primary">
              <MapPin className="h-5 w-5" />
              <h3 className="font-semibold">Sede</h3>
            </div>
            <p className="text-sm leading-relaxed text-slate-400">
              Paseo de las Palmas No. 2070, Col. Lomas de Chapultepec I Secc.
              Delegación Miguel Hidalgo. Ciudad de México C.P. 11000.
            </p>
          </div>

          {/* Teléfono */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-primary">
              <Phone className="h-5 w-5" />
              <h3 className="font-semibold">Teléfono Central</h3>
            </div>
            <p className="text-sm text-slate-400">
              +52 55 5261 4660 ext. 3158
            </p>
          </div>

          {/* Enlaces */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-primary">
              <Globe className="h-5 w-5" />
              <h3 className="font-semibold">Sitios Web</h3>
            </div>
            <div className="flex flex-col gap-2">
              <a
                href="https://big-i.com.mx"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm text-primary transition-colors hover:text-primary/80"
              >
                big-i.com.mx
                <ExternalLink className="h-3 w-3" />
              </a>
              <a
                href="https://kabgeo.com.mx"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm text-primary transition-colors hover:text-primary/80"
              >
                kabgeo.com.mx
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-slate-800" />

        {/* Directorio */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-primary">
            <User className="h-5 w-5" />
            <h3 className="font-semibold">Directorio</h3>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {/* Contact 1 */}
            <div className="rounded-lg border border-slate-800 bg-slate-800/30 p-4">
              <p className="font-medium text-slate-200">Alejandro Javier Lage Suárez</p>
              <div className="mt-2 flex flex-col gap-1">
                <a
                  href="mailto:alage@Big-i.com.mx"
                  className="inline-flex items-center gap-2 text-sm text-primary transition-colors hover:text-primary/80"
                >
                  <Mail className="h-3.5 w-3.5" />
                  alage@Big-i.com.mx
                </a>
                <a
                  href="tel:+525527194220"
                  className="inline-flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-slate-300"
                >
                  <Phone className="h-3.5 w-3.5" />
                  C. 55 2719 4220
                </a>
              </div>
            </div>

            {/* Contact 2 */}
            <div className="rounded-lg border border-slate-800 bg-slate-800/30 p-4">
              <p className="font-medium text-slate-200">Jorge Tello Torres</p>
              <div className="mt-2 flex flex-col gap-1">
                <a
                  href="mailto:jtello@Big-i.com.mx"
                  className="inline-flex items-center gap-2 text-sm text-primary transition-colors hover:text-primary/80"
                >
                  <Mail className="h-3.5 w-3.5" />
                  jtello@Big-i.com.mx
                </a>
                <a
                  href="tel:+525551058113"
                  className="inline-flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-slate-300"
                >
                  <Phone className="h-3.5 w-3.5" />
                  C. 55 5105 8113
                </a>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-slate-800" />

        {/* Copyright */}
        <div className="text-center text-xs text-slate-500">
          <p>&copy; {new Date().getFullYear()} BIG-i | Business Informatics & Geostatistics. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
