import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class", // Configura o modo escuro baseado na classe 'dark'
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
        progressIndeterminate: {
          "0%":   { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)"  },
        },
      },

      colors: {
        lamaSky: "#C3EBFA",
        lamaSkyLight: "#EDF9FD",
        lamaPurple: "#CFCEFF",
        lamaPurpleLight: "#F1F0FF",
        lamaYellow: "#FAE27C",
        lamaYellowLight: "#FEFCE8",
        smokeGreyStroke: "#959595",
        blueObs: "#0155AE",
      },
      opacity: {
        "37": "0.37", // Adiciona a opacidade de 37%
        "7": "0.07",
        "93": "0.93",
      },
      transitionProperty: {
        all: "all", // Adiciona suporte para 'all'
      },
      transitionTimingFunction: {
        default: "ease-in-out", // Define uma curva de transição padrão
      },
      transitionDuration: {
        default: "300ms", // Define a duração padrão para as transições
      },
    },
    screens: {
      sm: "640px", // @media (min-width: 640px) { ... }
      md: "768px", // @media (min-width: 768px) { ... }
      lg: "1024px", // @media (min-width: 1024px) { ... }
      xl: "1280px", // @media (min-width: 1280px) { ... }
      "2xl": "1536px", // @media (min-width: 1536px) { ... }
    },
  },
  plugins: [],
};

export default config;
