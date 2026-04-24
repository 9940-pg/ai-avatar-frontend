module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#3b82f6",       // blue-500 (main accent)
        primaryDark: "#2563eb",   // blue-600 (hover)

        background: "#0b1220",    // deep navy (better than pure black)
        surface: "#111827",       // card/chat panel

        glass: "rgba(255,255,255,0.08)",

        textPrimary: "#f9fafb",   // almost white
        textSecondary: "#9ca3af", // soft gray

        borderSoft: "rgba(255,255,255,0.12)",

        accentLight: "#60a5fa",   // lighter blue for gradients
      },
    },
  },
  plugins: [],
};