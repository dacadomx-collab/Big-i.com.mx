---
name: Intelligence Core
colors:
  surface: '#131312'
  surface-dim: '#131312'
  surface-bright: '#3a3937'
  surface-container-lowest: '#0e0e0c'
  surface-container-low: '#1c1c1a'
  surface-container: '#20201e'
  surface-container-high: '#2a2a28'
  surface-container-highest: '#353532'
  on-surface: '#e5e2de'
  on-surface-variant: '#bfc7d4'
  inverse-surface: '#e5e2de'
  inverse-on-surface: '#31302e'
  outline: '#89919e'
  outline-variant: '#3f4752'
  surface-tint: '#9bcbff'
  primary: '#9bcbff'
  on-primary: '#003256'
  primary-container: '#009ffe'
  on-primary-container: '#003457'
  inverse-primary: '#00629f'
  secondary: '#89ceff'
  on-secondary: '#00344d'
  secondary-container: '#3699d1'
  on-secondary-container: '#002d44'
  tertiary: '#ffb77f'
  on-tertiary: '#4e2600'
  tertiary-container: '#e97d00'
  on-tertiary-container: '#4f2700'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#d0e4ff'
  primary-fixed-dim: '#9bcbff'
  on-primary-fixed: '#001d34'
  on-primary-fixed-variant: '#004a79'
  secondary-fixed: '#c9e6ff'
  secondary-fixed-dim: '#89ceff'
  on-secondary-fixed: '#001e2f'
  on-secondary-fixed-variant: '#004c6e'
  tertiary-fixed: '#ffdcc4'
  tertiary-fixed-dim: '#ffb77f'
  on-tertiary-fixed: '#2f1500'
  on-tertiary-fixed-variant: '#6f3800'
  background: '#131312'
  on-background: '#e5e2de'
  surface-variant: '#353532'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  title-lg:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '500'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.05em
  label-sm:
    fontFamily: Inter
    fontSize: 10px
    fontWeight: '600'
    lineHeight: 12px
    letterSpacing: 0.08em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 4px
  gutter: 16px
  margin-mobile: 16px
  margin-desktop: 24px
  panel-padding: 12px
---

## Brand & Style

This design system is engineered for high-stakes geospatial intelligence and data-driven decision-making. The aesthetic direction is **Corporate / Modern** with a strong emphasis on **Precision Minimalism**. It evokes the feeling of a sophisticated command center—utilitarian yet sleek.

The UI is optimized for long-term focus, utilizing a dark-mode-first approach to reduce eye strain during intensive data analysis. Visual elements prioritize clarity and density, ensuring that large volumes of geospatial information remain legible and actionable. The target audience includes GIS analysts, urban planners, and intelligence officers who require a tool that feels as precise as the data it visualizes.

## Colors

The palette is anchored in a deep Graphite Black to provide a stable, low-distraction environment. 

- **Primary (Electric Blue):** Used for critical interactive elements, active states, and highlighting key geospatial markers. 
- **Secondary (Petroleum Blue):** Used for supporting UI elements, secondary buttons, and navigational accents to provide depth without competing with primary actions.
- **Neutral/Background:** The environment is built on Graphite Black, with a slightly darker surface color for the base canvas to create a "sunken" dashboard feel.
- **Accent/Text:** White is reserved for primary text and high-contrast labels, while Light Gray is used for metadata and inactive states. 

The color system relies on high-contrast ratios for data visualization layers, ensuring that map overlays and telemetry data remain prominent against the dark UI.

## Typography

This design system utilizes **Inter** exclusively to maintain a systematic and utilitarian feel. The hierarchy is designed for information density.

1. **Dashboards & Labels:** Small, all-caps labels with increased letter spacing are used for technical readouts and metadata, mimicking aeronautical displays.
2. **Body Text:** Standardized at 14px for maximum density without sacrificing legibility.
3. **Headlines:** Clean and bold, used sparingly to provide structure to complex data panels.

The type scale is intentionally conservative to maximize screen real estate for map and imagery components.

## Layout & Spacing

The layout model follows a **Fluid Grid** approach, allowing GIS tools and maps to expand to the full viewport width. 

- **Grid:** A 12-column system is used for settings and data overlays, while the main map interface occupies a base layer.
- **Density:** High-density spacing is achieved via a 4px base unit. Components are tightly packed with minimal whitespace to allow for simultaneous viewing of multiple data streams.
- **Panels:** Sidebars and bottom sheets use a fixed width (e.g., 320px or 400px) while the central content area remains fluid.
- **Breakpoints:** On mobile, sidebars transition to full-screen overlays or bottom drawers to maintain tool accessibility.

## Elevation & Depth

This design system rejects heavy shadows in favor of **Tonal Layers** and **Low-Contrast Outlines**. 

- **Surface Tiers:** Depth is established by lightening the background hex color as elements move closer to the user. The map is the lowest level (Base), while control panels sit on Surface Level 1, and modals sit on Surface Level 2.
- **Borders:** Every container, card, and input field is defined by a subtle 1px border (#2A2A28). This creates a "blueprint" or "schematic" feel that aligns with geospatial precision.
- **Interactions:** Hover states are indicated by subtle inner glows or color shifts rather than shadow increases, maintaining a flat, high-tech profile.

## Shapes

The shape language is strictly **Soft (0.25rem)**. 

By using a subtle corner radius, the design system avoids the harshness of purely sharp corners while maintaining the professional, "square" look required for technical dashboards. This minimal rounding ensures that buttons and cards feel integrated into a modern software ecosystem without appearing too casual or consumer-oriented. Buttons and chips use the same radius to maintain a cohesive, industrial aesthetic.

## Components

### Buttons
- **Primary:** Solid Electric Blue with white text. High-contrast and immediately identifiable.
- **Secondary:** Outline style with a Petroleum Blue border and text. 
- **Ghost:** Used for low-priority map controls; transparent background with Electric Blue text on hover.

### Inputs & Fields
- **Search/Filter:** Graphite Black background with a 1px border. The active state features an Electric Blue border glow.
- **Selects:** Monospaced-style text for coordinates or numerical data to ensure alignment.

### Cards & Panels
- **Data Panels:** Semi-transparent Graphite Black (90% opacity) to allow the map to be faintly visible underneath. 1px border is mandatory.
- **Status Chips:** Small, rectangular indicators with a 1px border. Use Electric Blue for "Active" and Light Gray for "Offline."

### Specialized Components
- **Coordinate Readouts:** Fixed-width numerical displays for latitude/longitude tracking.
- **Layer Toggle:** A specialized list component with high-contrast checkboxes to manage map visibility.
- **Telemetry Bars:** Thin, horizontal progress bars in Petroleum Blue used for data loading or signal strength.