import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        mist: "#F6F8F6",
        wash: "#F4F7F5",
        primary: "#6FAFA3",
        secondary: "#DDEEEA",
        accent: "#A8CFC7",
        ink: "#1F2A2A",
        muted: "#6B7775",
        surface: "rgba(255,255,255,0.78)",
      },
      boxShadow: {
        soft: "0 18px 48px rgba(31, 42, 42, 0.08)",
        lift: "0 14px 34px rgba(111, 175, 163, 0.18)",
      },
    },
  },
  plugins: [],
};

export default config;
