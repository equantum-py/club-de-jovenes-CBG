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
          forest: "#0E3B31",
          forestDark: "#082A24",
          forestLight: "#174C40",
          sage: "#7D7950",
          sageSoft: "#E7E0CF",
          gold: "#A89457",
          cream: "#EFE6D3",
          warmWhite: "#F8F1E5",
          ink: "#14372F",
          muted: "#6F746A",
          border: "#D9CFBC",
        },
      },
      boxShadow: {
        soft: "0 18px 45px rgba(8, 42, 36, 0.10)",
      },
    },
  },
  plugins: [],
};
