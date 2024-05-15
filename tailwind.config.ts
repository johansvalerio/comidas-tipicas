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
        'brownie': {
          '50': '#ccac95',
          '100': '#9d7e79',
        },
        'mud': {
          '50': '#9a947c',
          '100': '#748b83',
          '200': '#5b756c',
        },
        'choco': {
          '50': '#f8f2ce',
          '100': '#bdb495',
          '200': '#493d3f',
          '300': '#291d21',
          '400': '#020202',
        },
        'matcha': {
          '50': '#d8d989',
        }
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
