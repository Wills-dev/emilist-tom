import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      backgroundColor: {
        "full-transparent": "rgba(0, 0, 0, 0.1)",
        "half-transparent": "rgba(0, 0, 0, 0.5)",
        "part-transparent": "rgba(0, 0, 0, 0.9)",
      },
      fontFamily: {
        exo: ["Exo", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },
      colors: {
        "primary-green": "#25C269",
        "primary-orange": "#FF9933",
        "lighter-gray": "#ECECEC",
        "light-gray": "#D9D9D9",
      },
      backgroundImage: {
        "become-expert-banner": "url('/assets/images/privateExpertBanner.png')",
        "congrats-banner": "url('/assets/images/congrats.png')",
        "footer-texture": "url('/img/footer-texture.png')",
      },
      borderWidth: {
        1: "1px",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("daisyui")],
} satisfies Config;

export default config;
