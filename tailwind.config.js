/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#5f13c5",
          hover: "#4b0f9b",
        },
        mainPurple: "var(--mainPurple)",
        mainPurpleDark: "var(--mainPurpleDark)",

        navbarBg: "var(--navbarBg)",

        textColor: "var(--textColor)",
        greyText: "var(--greyText)",
        activeText: "var(--activeText)",
        purpleText: "var(--purpleText)",

        sidebarBg: "var(--sidebarBg)",
        sidebarLinksHover: "var(--sidebarLinksHover)",
        dashboardBg: "var(--dashboardBg)",

        whiteCard: "var(--whiteCard)",
        grayCard: "var(--grayCard)",

        inputBg: "var(--inputBg)",
      },
    },
  },
  plugins: [],
};

// Dark Theme Colors
// dark: {
//   primary: "#9c79f2", // Adjusted primary for better contrast in dark mode
//   grayCard: "#303030", // Card background in dark mode
//   dashboardBg: "#121212", // Dashboard background in dark mode
//   sidebarBg: "#1a1a1a", // Sidebar background in dark mode
//   textPrimary: "#ffffff", // Text color in dark mode
// },
