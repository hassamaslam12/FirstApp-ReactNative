/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        rubik: ["Rubik-Regular", "sans-sarif"],
        "rubik-bold": ["Rubik-Bold", "sans-sarif"],
        "rubik-extrabold": ["Rubik-ExtraBold", "sans-sarif"],
        "rubik-ledium": ["Rubik-Light", "sans-sarif"],
        "rubik-medium": ["Rubik-Medium", "sans-sarif"],
        "rubik-regular": ["Rubik-Regular", "sans-sarif"],
        "rubik-semibold": ["Rubik-SemiBold", "sans-sarif"],
      },
      colors: {
        primary: {
          100: "#0061FF0A",
          200: "#0061FF1A",
          300: "#0061FF",
        },
        accent: {
          100: "#FBFBFD",
        },
        black: {
          DEFAULT: "#000000",
          100: "#8C8E98",
          200: "#666876",
          300: "#191D31",
        },
        danger: "#F75555",
      },
    },
  },
  plugins: [],
};
