// tailwind.config.js
import { defineConfig } from "vite";
import tailwindcss from "tailwindcss";

export default defineConfig({
  plugins: [
    tailwindcss({
      content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx,html}"],
      theme: {
        extend: {
          colors: {
            primary: "var(--color-primary)",
            "surface-tint": "var(--color-surface-tint)",
            "on-primary": "var(--color-on-primary)",
            "primary-container": "var(--color-primary-container)",
            "on-primary-container": "var(--color-on-primary-container)",
            secondary: "var(--color-secondary)",
            "on-secondary": "var(--color-on-secondary)",
            "secondary-container": "var(--color-secondary-container)",
            "on-secondary-container": "var(--color-on-secondary-container)",
            tertiary: "var(--color-tertiary)",
            "on-tertiary": "var(--color-on-tertiary)",
            "tertiary-container": "var(--color-tertiary-container)",
            "on-tertiary-container": "var(--color-on-tertiary-container)",
            error: "var(--color-error)",
            "on-error": "var(--color-on-error)",
            "error-container": "var(--color-error-container)",
            "on-error-container": "var(--color-on-error-container)",
            background: "var(--color-background)",
            "on-background": "var(--color-on-background)",
            surface: "var(--color-surface)",
            "on-surface": "var(--color-on-surface)",
            "surface-variant": "var(--color-surface-variant)",
            "on-surface-variant": "var(--color-on-surface-variant)",
            outline: "var(--color-outline)",
            "outline-variant": "var(--color-outline-variant)",
            shadow: "var(--color-shadow)",
            scrim: "var(--color-scrim)",
            "inverse-surface": "var(--color-inverse-surface)",
            "inverse-on-surface": "var(--color-inverse-on-surface)",
            "inverse-primary": "var(--color-inverse-primary)",
            "primary-fixed": "var(--color-primary-fixed)",
            "on-primary-fixed": "var(--color-on-primary-fixed)",
            "primary-fixed-dim": "var(--color-primary-fixed-dim)",
            "on-primary-fixed-variant": "var(--color-on-primary-fixed-variant)",
            "secondary-fixed": "var(--color-secondary-fixed)",
            "on-secondary-fixed": "var(--color-on-secondary-fixed)",
            "secondary-fixed-dim": "var(--color-secondary-fixed-dim)",
            "on-secondary-fixed-variant":
              "var(--color-on-secondary-fixed-variant)",
            "tertiary-fixed": "var(--color-tertiary-fixed)",
            "on-tertiary-fixed": "var(--color-on-tertiary-fixed)",
            "tertiary-fixed-dim": "var(--color-tertiary-fixed-dim)",
            "on-tertiary-fixed-variant":
              "var(--color-on-tertiary-fixed-variant)",
            "surface-dim": "var(--color-surface-dim)",
            "surface-bright": "var(--color-surface-bright)",
            "surface-container-lowest": "var(--color-surface-container-lowest)",
            "surface-container-low": "var(--color-surface-container-low)",
            "surface-container": "var(--color-surface-container)",
            "surface-container-high": "var(--color-surface-container-high)",
            "surface-container-highest":
              "var(--color-surface-container-highest)",
          },
        },
      },
    }),
  ],
});
