import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "primary": "#027F8D",
        "secondary": "#F2F5F2",
        "dark": "#31363F",
        "c-gray-300": "#61677A",
        "c-gray-200": "#EEEFF1",
        "c-gray-100": "#F7F7F9",
        "c-info": "#F2F5F2"
      }
    },
  },
  plugins: [],
};
export default config;
