import type { Config } from "tailwindcss";

export default {
  darkMode: "selector",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true 
    },
    extend: {
      colors: {
        bgDarkPrimary: "#3d3d3d",
        bgDarkSecondary: "#4b4b4b",
        bgLightPrimary: "#f1f2f6",
        bgLightSecondary: "#ffffff",
        txtLightPrimary: "#000000",
        txtLightSecondary: "#4b4b4b",
        txtDarkPrimary: "#ffffff",
        txtDarkSecondary: "#f1f2f6",
        link: "#0fbcf9"
      }
    },
  },
  plugins: [],
} satisfies Config;
