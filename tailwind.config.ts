import type { Config } from "tailwindcss";
/** @type {import('tailwindcss').Config} */

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    // screens: {
    //   sm: "480px",
    //   md: "768px",
    //   lg: "976px",
    //   xl: "1440px",
    // },
    colors: {
      // blue: "#00A0DC",
    },
    // // fontFamily: {
    // //   sans: ['Graphik', 'sans-serif'],
    // //   serif: ['Merriweather', 'serif'],
    // // },
    // extend: {
    //   spacing: {
    //     "128": "32rem",
    //     "144": "36rem",
    //   },
    //   borderRadius: {
    //     "4xl": "2rem",
    //   },
    // },
  },
  plugins: [require("@tailwindcss/forms")],
};
export default config;
