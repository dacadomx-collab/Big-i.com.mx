/* ============================================================
   BIG-i · js/tailwind.config.js
   Configuración Tailwind CDN compartida para todas las páginas.
   Cargado DESPUÉS del CDN script, ANTES de css/style.css.
   ============================================================ */
tailwind.config = {
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                "primary":                    "#9bcbff",
                "primary-container":          "#009ffe",
                "primary-fixed":              "#d0e4ff",
                "primary-fixed-dim":          "#9bcbff",
                "on-primary":                 "#003256",
                "on-primary-container":       "#003457",
                "on-primary-fixed":           "#001d34",
                "on-primary-fixed-variant":   "#004a79",
                "inverse-primary":            "#00629f",

                "secondary":                  "#89ceff",
                "secondary-container":        "#3699d1",
                "secondary-fixed":            "#c9e6ff",
                "secondary-fixed-dim":        "#89ceff",
                "on-secondary":               "#00344d",
                "on-secondary-container":     "#002d44",
                "on-secondary-fixed":         "#001e2f",
                "on-secondary-fixed-variant": "#004c6e",

                "tertiary":                   "#ffb77f",
                "tertiary-container":         "#e97d00",
                "tertiary-fixed":             "#ffdcc4",
                "tertiary-fixed-dim":         "#ffb77f",
                "on-tertiary":                "#4e2600",
                "on-tertiary-container":      "#4f2700",
                "on-tertiary-fixed":          "#2f1500",
                "on-tertiary-fixed-variant":  "#6f3800",

                "error":                      "#ffb4ab",
                "error-container":            "#93000a",
                "on-error":                   "#690005",
                "on-error-container":         "#ffdad6",

                "background":                 "#131312",
                "on-background":              "#e5e2de",
                "surface":                    "#131312",
                "surface-dim":                "#131312",
                "surface-bright":             "#3a3937",
                "surface-tint":               "#9bcbff",
                "surface-variant":            "#353532",
                "surface-container-lowest":   "#0e0e0c",
                "surface-container-low":      "#1c1c1a",
                "surface-container":          "#20201e",
                "surface-container-high":     "#2a2a28",
                "surface-container-highest":  "#353532",
                "on-surface":                 "#e5e2de",
                "on-surface-variant":         "#bfc7d4",
                "inverse-surface":            "#e5e2de",
                "inverse-on-surface":         "#31302e",

                "outline":                    "#89919e",
                "outline-variant":            "#3f4752",

                "electric-blue":              "#009FFE",
                "graphite":                   "#1D1D1B"
            },
            borderRadius: {
                "DEFAULT": "0.125rem",
                "lg":      "0.25rem",
                "xl":      "0.5rem",
                "full":    "0.75rem"
            },
            spacing: {
                "unit":           "4px",
                "gutter":         "16px",
                "panel-padding":  "12px",
                "margin-desktop": "24px",
                "margin-mobile":  "16px"
            },
            fontFamily: {
                "display-lg":         ["Inter"],
                "headline-lg":        ["Inter"],
                "headline-lg-mobile": ["Inter"],
                "headline-md":        ["Inter"],
                "title-lg":           ["Inter"],
                "body-lg":            ["Inter"],
                "body-md":            ["Inter"],
                "label-md":           ["Inter"],
                "label-sm":           ["Inter"]
            },
            fontSize: {
                "display-lg":         ["48px",  { lineHeight: "56px",  letterSpacing: "-0.02em", fontWeight: "700" }],
                "headline-lg":        ["32px",  { lineHeight: "40px",  letterSpacing: "-0.01em", fontWeight: "600" }],
                "headline-lg-mobile": ["28px",  { lineHeight: "36px",  fontWeight: "600" }],
                "headline-md":        ["24px",  { lineHeight: "32px",  fontWeight: "600" }],
                "title-lg":           ["20px",  { lineHeight: "28px",  fontWeight: "500" }],
                "body-lg":            ["16px",  { lineHeight: "24px",  fontWeight: "400" }],
                "body-md":            ["14px",  { lineHeight: "20px",  fontWeight: "400" }],
                "label-md":           ["12px",  { lineHeight: "16px",  letterSpacing: "0.05em", fontWeight: "500" }],
                "label-sm":           ["10px",  { lineHeight: "12px",  letterSpacing: "0.08em", fontWeight: "600" }]
            }
        }
    }
};
