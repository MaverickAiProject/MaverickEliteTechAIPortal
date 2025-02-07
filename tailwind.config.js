/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
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
        dashboardMainBg: "var(--dashboardMainBg)",

        whiteCard: "var(--whiteCard)",
        whiteCardHover: "var(--whiteCardHover)",
        grayCard: "var(--grayCard)",

        inputBg: "var(--inputBg)",
      },
    },
  },
  plugins: [],
};
