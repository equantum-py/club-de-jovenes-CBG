/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          forest: "#183A2B",
          forestDark: "#10271E",
          forestLight: "#254D3B",
          sage: "#7A835C",
          sageSoft: "#E7E9DE",
          gold: "#A87E32",
          cream: "#F5F1E8",
          warmWhite: "#FCFAF5",
          ink: "#1C211E",
          muted: "#687069",
          border: "#DED8CB",
        },
      },
      boxShadow: {
        soft: "0 18px 45px rgba(16, 39, 30, 0.08)",
      },
    },
  },
  plugins: [],
};
