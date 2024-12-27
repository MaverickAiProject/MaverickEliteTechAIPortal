/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class", // Enable dark mode using the `class` strategy
  theme: {
    extend: {
      colors: {
        // Light Theme Colors
        primary: {
          DEFAULT: "#5f13c5", // Primary action color
          dark: "#4b0f9b", // Darker shade for hover effects
        },
        grayCard: "#e9e9e9", // Card background color
        dashboardBg: "#e7effe", // Dashboard working area background
        sidebarBg: "#ffffff", // Sidebar background
        textPrimary: "#000000", // Primary text color

        // Dark Theme Colors
        dark: {
          primary: "#9c79f2", // Adjusted primary for better contrast in dark mode
          grayCard: "#303030", // Card background in dark mode
          dashboardBg: "#121212", // Dashboard background in dark mode
          sidebarBg: "#1a1a1a", // Sidebar background in dark mode
          textPrimary: "#ffffff", // Text color in dark mode
        },
      },
    },
  },
  plugins: [],
};
