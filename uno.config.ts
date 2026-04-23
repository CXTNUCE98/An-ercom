import type { UserConfig } from "unocss";
import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from "unocss";

export const unoConfig: UserConfig = {
  theme: {
    colors: {
      // Editorial palette — driven by CSS vars in src/assets/css/theme.css
      paper: "var(--paper)",
      cream: "var(--cream)",
      linen: "var(--linen)",
      warm: "var(--warm)",
      surface: "var(--surface)",

      ink: "var(--ink)",
      mid: "var(--mid)",
      smoke: "var(--smoke)",

      brass: {
        DEFAULT: "var(--brass)",
        light: "var(--brass-light)",
        deep: "var(--brass-deep)",
      },
      oxblood: "var(--oxblood)",
      olive: "var(--olive)",

      accent: {
        DEFAULT: "var(--accent)",
        2: "var(--accent-2)",
      },
      "on-accent": "var(--on-accent)",
      leather: "var(--leather)",

      // Semantic aliases
      primary: "var(--accent)",
      bg: {
        DEFAULT: "var(--bg)",
        page: "var(--paper)",
        card: "var(--card)",
        "card-alt": "var(--card-alt)",
      },
      card: "var(--card)",
      "card-alt": "var(--card-alt)",
      text: {
        DEFAULT: "var(--text)",
        primary: "var(--text)",
        regular: "var(--mid)",
        secondary: "var(--smoke)",
        soft: "var(--mid)",
      },
      rule: "var(--rule)",
      "rule-strong": "var(--rule-strong)",
      border: {
        DEFAULT: "var(--rule)",
        strong: "var(--rule-strong)",
      },

      // Status colors — kept for notifications / form states
      success: "#3FA34D",
      warning: "#D9A400",
      danger: "#C0392B",
      error: "#C0392B",
      info: "#3B82F6",
    },
    fontFamily: {
      display: "var(--font-display)",
      body: "var(--font-body)",
      condensed: "var(--font-condensed)",
      heading: "var(--font-display)",
      sans: "var(--font-body)",
    },
    spacing: {
      xs: "16px",
      sm: "var(--sp-sm)",
      md: "var(--sp-md)",
      lg: "var(--sp-lg)",
      xl: "var(--sp-xl)",
      gutter: "var(--gutter)",
    },
    // NOTE: keyframes live in src/assets/css/theme.css (ironman-*).
    // We expose them via shortcuts (animate-fade-up, animate-marquee, …) below
    // so we don't duplicate keyframe bodies in the Uno preflights.
  },
  shortcuts: [
    ["text-helper", "text-13px leading-20px mb-4px font-medium text-smoke"],
    ["flex-center", "flex items-center justify-center"],
    [
      "btn-primary",
      "inline-flex items-center justify-center gap-2 px-6 py-3 bg-accent text-on-accent font-semibold tracking-widest uppercase text-xs transition-all duration-300 hover:bg-brass-light active:scale-[0.97] disabled:opacity-50 disabled:cursor-not-allowed",
    ],
    [
      "btn-secondary",
      "inline-flex items-center justify-center gap-2 px-6 py-3 bg-card text-text border border-rule font-semibold tracking-widest uppercase text-xs transition-all duration-300 hover:border-accent hover:text-accent active:scale-[0.97]",
    ],
    [
      "btn-outline",
      "inline-flex items-center justify-center gap-2 px-6 py-3 bg-transparent border border-rule text-text font-semibold tracking-widest uppercase text-xs transition-all duration-300 hover:border-accent hover:text-accent active:scale-[0.97]",
    ],
    [
      "btn-gold",
      "inline-flex items-center gap-2 px-6 py-3 bg-accent text-on-accent border-none cursor-pointer font-semibold tracking-widest uppercase text-xs transition-all duration-300 hover:bg-brass-light",
    ],
    [
      "btn-ghost-gold",
      "inline-flex items-center gap-2 px-6 py-3 bg-transparent border border-accent text-accent cursor-pointer font-semibold tracking-widest uppercase text-xs transition-all duration-300 hover:bg-accent hover:text-on-accent",
    ],
    [
      "btn-shimmer",
      "relative overflow-hidden before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/25 before:to-transparent before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700",
    ],
    [
      "card-luxury",
      "border border-rule bg-card p-6 transition-all duration-300",
    ],
    [
      "eyebrow",
      "inline-block font-condensed text-[0.7rem] font-semibold tracking-[4px] uppercase text-accent",
    ],
    [
      "eyebrow-sm",
      "inline-block font-condensed text-[0.6rem] font-semibold tracking-[3px] uppercase text-accent",
    ],
    [
      "eyebrow-lg",
      "inline-block font-condensed text-xs font-semibold tracking-[5px] uppercase text-accent",
    ],
    [
      "eyebrow-gold",
      "text-xs font-semibold tracking-[4px] uppercase text-accent font-condensed",
    ],
    [
      "vrail",
      "font-condensed text-[0.7rem] font-semibold tracking-[5px] uppercase text-accent [writing-mode:vertical-rl] rotate-180",
    ],
    ["hairline", "h-px w-full bg-rule"],
    ["divider-gold", "h-px w-full bg-accent opacity-40"],
    [
      "card",
      "bg-card border border-rule p-6 transition-all duration-300",
    ],
    [
      "card-interactive",
      "card hover:border-accent hover:-translate-y-1 cursor-pointer",
    ],
    [
      "card-hover-lift",
      "transition-all duration-300 hover:-translate-y-1 hover:border-accent",
    ],
    [
      "card-media-hover",
      "overflow-hidden [&_img]:transition-transform [&_img]:duration-700 hover:[&_img]:scale-105",
    ],
    [
      "section-title",
      "text-3xl md:text-4xl font-bold text-text mb-8 tracking-tight font-display",
    ],
    [
      "input-field",
      "w-full px-4 py-3 border border-rule bg-card text-text focus:border-accent outline-none transition-all duration-300 placeholder:text-smoke",
    ],
    [
      "glass-card",
      "backdrop-blur-2xl bg-card/60 border border-rule shadow-2xl",
    ],
    [
      "chip",
      "inline-flex items-center gap-2 px-4 py-2 border border-rule bg-card text-text font-condensed text-xs tracking-[3px] uppercase cursor-pointer transition-all duration-300 hover:border-accent hover:text-accent",
    ],
    [
      "chip-active",
      "border-accent text-on-accent bg-accent",
    ],
    [
      "tab-btn",
      "px-4 py-2 font-condensed text-xs tracking-[3px] uppercase border-b-2 border-transparent text-smoke cursor-pointer transition-all duration-300 hover:text-accent",
    ],
    [
      "tab-btn-active",
      "text-accent border-accent",
    ],
    [
      "section-eyebrow-block",
      "flex items-center gap-3 mb-4",
    ],
    // ── Animation shortcuts — wire Uno classes to ironman-* keyframes
    // defined in src/assets/css/theme.css (single source of truth).
    ["animate-fade-up", "[animation:ironman-fade-up_0.7s_ease_both]"],
    ["animate-card-float", "[animation:ironman-card-float_6s_ease-in-out_infinite]"],
    ["animate-rotate-slow", "[animation:ironman-rotate-slow_20s_linear_infinite]"],
    ["animate-scroll-line", "[animation:ironman-scroll-line_2.4s_ease-in-out_infinite]"],
    ["animate-bounce-down", "[animation:ironman-bounce-down_1.6s_ease-in-out_infinite]"],
    ["animate-marquee", "[animation:ironman-marquee_30s_linear_infinite]"],
    ["animate-fade-up-x", "[animation:ironman-fade-up-x_0.45s_ease_forwards]"],
    ["animate-pulse-ring", "[animation:ironman-pulse-ring_2s_ease-out_infinite]"],
  ],
  // NOTE: rules array (further below) also adds: stagger-N, bg-mix-*, text-clamp-*-*
  presets: [
    presetTypography(),
    presetAttributify(),
    presetIcons({
      warn: true,
      collections: {
        carbon: () =>
          import("@iconify-json/carbon/icons.json").then(
            (i) => i.default as any
          ),
      },
    }),
    presetUno(),
    presetWebFonts({
      provider: "google",
      fonts: {
        // Editorial display + body — match Google Fonts loaded in nuxt.config.ts head
        display: {
          name: "Playfair Display",
          weights: ["400", "700", "900"],
        },
        body: {
          name: "Barlow",
          weights: ["300", "400", "500", "600"],
        },
        condensed: {
          name: "Barlow Condensed",
          weights: ["300", "400", "500", "600", "700"],
        },
        sans: {
          name: "Plus Jakarta Sans",
          weights: ["300", "400", "500", "600", "700", "800"],
        },
        heading: {
          name: "Outfit",
          weights: ["400", "500", "600", "700", "800", "900"],
        },
      },
    }),
  ],
  safelist: [
    // Dynamic shortcuts that may not appear in source as literal strings
    ...Array.from({ length: 12 }, (_, i) => `stagger-${i + 1}`),
    "chip-active",
    "tab-btn-active",
  ],
  rules: [
    ["break-word", { "word-break": "break-word" }],
    // Staircase animation delay (uses inline --i custom prop on element)
    [
      /^stagger-(\d+)$/,
      ([, n]) => ({ "animation-delay": `calc(var(--i, 0) * ${n}ms)` }),
    ],
    // color-mix overlay backgrounds, e.g. bg-mix-accent-30 → 30% accent over transparent
    [
      /^bg-mix-(accent|ink|brass|paper|cream|on-accent|oxblood|olive)-(\d+)$/,
      ([, name, pct]) => ({
        background: `color-mix(in oklab, var(--${name}) ${pct}%, transparent)`,
      }),
    ],
    // text-clamp utilities for fluid typography (e.g., text-clamp-32-64)
    [
      /^text-clamp-(\d+)-(\d+)$/,
      ([, min, max]) => ({
        "font-size": `clamp(${min}px, calc(${min}px + (${max} - ${min}) * (100vw - 360px) / (1440 - 360)), ${max}px)`,
      }),
    ],
  ],
  transformers: [transformerVariantGroup(), transformerDirectives()],
  preflights: [
    {
      getCSS: () => `
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes bounceIn {
          0% { opacity: 0; transform: scale(0.3); }
          50% { opacity: 1; transform: scale(1.05); }
          70% { transform: scale(0.9); }
          100% { transform: scale(1); }
        }
        @keyframes heroPattern {
          0% { transform: translate(0, 0); }
          100% { transform: translate(60px, 60px); }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-float-slow { animation: float 8s ease-in-out infinite; }
        .animate-float-slower { animation: float 7s ease-in-out infinite; }
        .animate-fade-in-down { animation: fadeInDown 0.6s ease-out; }
        .animate-fade-in-up { animation: fadeInUp 0.6s ease-out 0.2s both; }
        .animate-fade-in-up-delay { animation: fadeInUp 0.6s ease-out 0.4s both; }
        .animate-bounce-in { animation: bounceIn 0.6s ease-out; }
        .animate-hero-pattern { animation: heroPattern 20s linear infinite; }
        @keyframes goldShimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        .gold-shimmer {
          background: linear-gradient(90deg, var(--brass) 0%, var(--brass-light) 40%, var(--brass) 80%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: goldShimmer 3s linear infinite;
        }
      `,
    },
  ],
};

export default defineConfig(unoConfig);
