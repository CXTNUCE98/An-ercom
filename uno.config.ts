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
      primary: {
        DEFAULT: "var(--el-color-primary)",
        light: {
          3: "var(--el-color-primary-light-3)",
          5: "var(--el-color-primary-light-5)",
          7: "var(--el-color-primary-light-7)",
          8: "var(--el-color-primary-light-8)",
          9: "var(--el-color-primary-light-9)",
        },
        dark: {
          2: "var(--el-color-primary-dark-2)",
        },
      },

      success: {
        DEFAULT: "var(--el-color-success)",
        light: {
          3: "var(--el-color-success-light-3)",
          5: "var(--el-color-success-light-5)",
          7: "var(--el-color-success-light-7)",
          8: "var(--el-color-success-light-8)",
          9: "var(--el-color-success-light-9)",
        },
        dark: {
          2: "var(--el-color-success-dark-2)",
        },
      },

      warning: {
        DEFAULT: "var(--el-color-warning)",
        light: {
          3: "var(--el-color-warning-light-3)",
          5: "var(--el-color-warning-light-5)",
          7: "var(--el-color-warning-light-7)",
          8: "var(--el-color-warning-light-8)",
          9: "var(--el-color-warning-light-9)",
        },
        dark: {
          2: "var(--el-color-warning-dark-2)",
        },
      },

      danger: {
        DEFAULT: "var(--el-color-danger)",

        light: {
          3: "var(--el-color-danger-light-3)",
          5: "var(--el-color-danger-light-5)",
          7: "var(--el-color-danger-light-7)",
          8: "var(--el-color-danger-light-8)",
          9: "var(--el-color-danger-light-9)",
        },
        dark: {
          2: "var(--el-color-danger-dark-2)",
        },
      },

      error: {
        DEFAULT: "var(--el-color-error)",
        light: {
          3: "var(--el-color-error-light-3)",
          5: "var(--el-color-error-light-5)",
          7: "var(--el-color-error-light-7)",
          8: "var(--el-color-error-light-8)",
          9: "var(--el-color-error-light-9)",
        },
        dark: {
          2: "var(--el-color-error-dark-2)",
        },
      },

      info: {
        DEFAULT: "var(--el-color-info)",
        light: {
          3: "var(--el-color-info-light-3)",
          5: "var(--el-color-info-light-5)",
          7: "var(--el-color-info-light-7)",
          8: "var(--el-color-info-light-8)",
          9: "var(--el-color-info-light-9)",
        },
        dark: {
          2: "var(--el-color-info-dark-2)",
        },
      },

      bg: {
        DEFAULT: "var(--el-bg-color)",
        page: "var(--el-bg-color-page)",
        overlay: "var(--el-bg-color-overlay)",
      },

      text: {
        primary: "var(--el-text-color-primary)",
        regular: "var(--el-text-color-regular)",
        secondary: "var(--el-text-color-secondary)",
        placeholder: "var(--el-text-color-placeholder)",
        disabled: "var(--el-text-color-disabled)",
      },

      border: {
        DEFAULT: "var(--el-border-color)",
        light: "var(--el-border-color-light)",
        lighter: "var(--el-border-color-lighter)",
        extraLight: "var(--el-border-color-extra-light)",
        dark: "var(--el-border-color-dark)",
        darker: "var(--el-border-color-darker)",
        hover: "var(--el-border-color-hover)",
      },

      fill: {
        DEFAULT: "var(--el-fill-color)",
        light: "var(--el-fill-color-light)",
        lighter: "var(--el-fill-color-lighter)",
        extraLight: "var(--el-fill-color-extra-light)",
        dark: "var(--el-fill-color-dark)",
        darker: "var(--el-fill-color-darker)",
        blank: "var(--el-fill-color-blank)",
      },

      disabled: {
        bg: "var(--el-disabled-bg-color)",
        text: "var(--el-disabled-text-color)",
        border: "var(--el-disabled-border-color)",
      },

      overlay: {
        DEFAULT: "var(--el-overlay-color)",
        light: "var(--el-overlay-color-light)",
        lighter: "var(--el-overlay-color-lighter)",
      },

      mask: {
        DEFAULT: "var(--el-mask-color)",
        extraLight: "var(--el-mask-color-extra-light)",
      },
      svgMonochromeGrey: "var(--el-svg-monochrome-grey)",
    },
    boxShadow: {
      danger: "0 0 0 1px var(--el-color-danger) inset",
    },
  },
  shortcuts: [
    ["text-helper", "text-13px leading-20px mb-4px font-medium text-slate-500"],
    ["flex-center", "flex items-center justify-center"],
    [
      "el-form-label",
      "[&_.el-form-item\\_\\_label]:(mb-6px! font-semibold! text-slate-700 dark:text-slate-300)",
    ],
    [
      "btn-primary",
      "bg-gradient-to-r from-slate-900 to-slate-800 dark:from-slate-100 dark:to-slate-200 text-white dark:text-slate-900 px-6 py-2.5 rounded-xl font-semibold shadow-lg shadow-slate-900/5 dark:shadow-slate-100/5 hover:shadow-xl hover:shadow-slate-900/10 dark:hover:shadow-slate-100/10 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.97] flex-center gap-2",
    ],
    [
      "btn-secondary",
      "bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-800 px-6 py-2.5 rounded-xl font-semibold shadow-sm hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-300 active:scale-[0.97] flex-center gap-2",
    ],
    [
      "btn-outline",
      "border-2 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 px-6 py-2.5 rounded-xl font-semibold hover:bg-slate-50 dark:hover:bg-slate-900 hover:border-slate-900 dark:hover:border-white hover:text-slate-900 dark:hover:text-white transition-all duration-300 active:scale-[0.97] flex-center gap-2",
    ],
    [
      "card",
      "bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] p-6 border border-slate-200/50 dark:border-slate-800/50",
    ],
    [
      "card-interactive",
      "card hover:border-blue-500/50 dark:hover:border-blue-400/50 hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] dark:hover:shadow-[0_20px_40px_rgb(0,0,0,0.3)] transition-all duration-500 cursor-pointer",
    ],
    [
      "gradient-border",
      "relative before:absolute before:inset-0 before:rounded-2xl before:p-[1px] before:bg-gradient-to-r before:from-blue-500 before:to-purple-500 before:opacity-20 before:-z-10",
    ],
    [
      "section-title",
      "text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-8 tracking-tight font-heading",
    ],
    [
      "input-field",
      "w-full px-4 py-3 border-2 border-slate-100 dark:border-slate-800 rounded-xl bg-slate-50/50 dark:bg-slate-900/50 text-slate-900 dark:text-white focus:border-blue-500 dark:focus:border-blue-400 outline-none transition-all duration-300 placeholder:text-slate-400",
    ],
    [
      "glass-card",
      "backdrop-blur-2xl bg-white/40 dark:bg-slate-950/40 border border-white/20 dark:border-slate-800/40 shadow-2xl rounded-2xl",
    ],
  ],
  presets: [
    presetTypography(),
    presetAttributify(),
    presetIcons({
      warn: true,
      collections: {
        ep: () =>
          import("@iconify-json/ep/icons.json").then((i) => i.default as any),
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
  safelist: [],
  rules: [
    ["box-shadow", { "box-shadow": "var(--el-box-shadow)" }],
    ["box-shadow-light", { "box-shadow": "var(--el-box-shadow-light)" }],
    ["box-shadow-lighter", { "box-shadow": "var(--el-box-shadow-lighter)" }],
    ["box-shadow-dark", { "box-shadow": "var(--el-box-shadow-dark)" }],
    ["break-word", { "word-break": "break-word" }],
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
      `,
    },
  ],
};

export default defineConfig(unoConfig);
