/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,tsx}", "./public/**/*.html"],
  theme: {
    extend: {
      height: {
        header: "var(--headerHeight)",
        pagewithheader: "calc(100vh - var(--headerHeight))",
      },
    },
  },
  plugins: [],
};
